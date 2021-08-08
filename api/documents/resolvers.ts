import { Prisma } from '@prisma/client'
import { container, injectable } from 'tsyringe'
import { Context } from '../context'
import {
  UserDocumentInput,
  UserDocumentUpdateInput,
  Resolvers,
  MutationAddUserDocumentArgs,
  Person,
  Journal,
  QueryUserDocumentArgs,
  Institution,
  DocumentResolvers,
} from '../graphql'
import { ResolveType } from '../utils/extractResolveType'
import { UserDocumentService, UserDocument } from './user.document.service'

// Fields that are stored as separate columns in the database
const specialFields: string[] = [
  'author',
  'editor',
  'title',
  'journal',
  'journaltitle',
  'booktitle',
  'date',
  'year',
  'month',
  'number',
  'volume',
  'edition',
  'series',
  'pages',
  'pagetotal',
  'issue',
  'note',
  'url',
  'urldate',
  'publisher',
  'abstract',
  'keywords',
  'priority',
  'doi',
  'eprint',
  'eprintclass',
  'eprinttype',
  'issn',
  'isbn',
]

function convertDocumentInput(
  document: UserDocumentInput | UserDocumentUpdateInput
): Prisma.UserDocumentCreateInput {
  const special = document.fields
    ?.filter((item) => specialFields.includes(item.field))
    .map((item) => {
      return [item.field, item.value]
    })
  const other = document.fields
    ?.filter((item) => !specialFields.includes(item.field))
    .map((item) => {
      return {
        field: item.field,
        value: item.value,
      }
    })

  let convertedDocument: Prisma.UserDocumentCreateInput = {
    type: document.type ?? 'unknown',
    citationKey: document.citationKey ?? null,
    lastModified: document.lastModified ?? null,
    added: document.added ?? null,
    ...(other &&
      other.length > 0 && {
        other: {
          createMany: {
            data: other,
          },
        },
      }),
  }

  if (special) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    convertedDocument = Object.assign(
      convertedDocument,
      Object.fromEntries(special)
    )
  }
  if ('id' in document) {
    convertedDocument = Object.assign(convertedDocument, { id: document.id })
  }

  return convertedDocument
}

@injectable()
export class Query {
  constructor(private userDocumentService: UserDocumentService) {}

  async userDocument(
    _root: Record<string, never>,
    { id }: QueryUserDocumentArgs,
    _context: Context
  ): Promise<UserDocument | null> {
    return await this.userDocumentService.getDocumentById(id, true)
  }
}

@injectable()
export class Mutation {
  constructor(private userDocumentService: UserDocumentService) {}

  async addUserDocument(
    _root: Record<string, never>,
    { document }: MutationAddUserDocumentArgs,
    _context: Context
  ): Promise<UserDocument | null> {
    return await this.userDocumentService.addDocument(
      convertDocumentInput(document)
    )
  }
}

@injectable()
export class DocumentResolver {
  __resolveType(document: UserDocument): ResolveType<DocumentResolvers> {
    switch (document.type) {
      case 'JournalArticle':
      case 'ProceedingsArticle':
      case 'Thesis':
      case 'Other':
        return document.type
      default:
        return 'Other'
    }
  }

  authors(document: UserDocument): Person[] {
    if (document.author) {
      // TODO: Already store authors separately on save?
      return document.author.split(' and ').map((name) => {
        return {
          id: 'TODO' + name,
          name,
          __typename: 'Person',
        }
      })
    } else {
      return []
    }
  }

  keywords(document: UserDocument): string[] {
    // TODO: Already store keywords on save as a list?
    return document.keywords?.split(',') ?? []
  }
}

@injectable()
export class JournalArticleResolver extends DocumentResolver {
  journal(document: UserDocument): Journal | null {
    const journalName = document.journal ?? document.journaltitle
    if (journalName) {
      return {
        id: 'TODO' + journalName,
        name: journalName,
      }
    } else {
      return null
    }
  }
}

@injectable()
export class ProceedingsArticleResolver extends DocumentResolver {
  booktitle(document: UserDocument): string | null {
    return document.booktitle
  }
}

@injectable()
export class ThesisResolver extends DocumentResolver {
  institution(document: UserDocument): Institution | null {
    const institutionName = document.other?.find(
      (field) => field.field === 'institution'
    )?.value

    if (institutionName) {
      return {
        id: 'TODO' + institutionName,
        name: institutionName,
      }
    } else {
      return null
    }
  }
}

@injectable()
export class OtherResolver extends DocumentResolver {}

export function resolvers(): Resolvers {
  return {
    Query: container.resolve(Query),
    Mutation: container.resolve(Mutation),
    Document: container.resolve(DocumentResolver),
    JournalArticle: container.resolve(JournalArticleResolver),
    ProceedingsArticle: container.resolve(ProceedingsArticleResolver),
    Thesis: container.resolve(ThesisResolver),
    Other: container.resolve(OtherResolver),
  }
}
