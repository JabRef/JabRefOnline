import { Prisma } from '@prisma/client'
import { container, injectable } from 'tsyringe'
import { Context } from '../context'
import {
  DocumentInput,
  DocumentUpdateInput,
  DocumentType,
  Resolvers,
  MutationAddUserDocumentArgs,
  Person,
  Journal,
  QueryUserDocumentArgs,
  Institution,
} from '../graphql'
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
  document: DocumentInput | DocumentUpdateInput
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

export function parse(type: string): DocumentType | null {
  const found = Object.entries(DocumentType).find(
    ([key, _value]) =>
      key.localeCompare(type, undefined, { sensitivity: 'accent' }) === 0
  )
  if (found) {
    return found[1]
  } else {
    return null
  }
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
  __resolveType(
    document: UserDocument
  ): 'Article' | 'InProceedings' | 'PhdThesis' | 'Unknown' {
    switch (parse(document.type)) {
      case DocumentType.Article:
        return 'Article'
      case DocumentType.InProceedings:
        return 'InProceedings'
      case DocumentType.PhdThesis:
        return 'PhdThesis'
      default:
        return 'Unknown'
    }
  }

  type(document: UserDocument): DocumentType | null {
    return parse(document.type)
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
export class ArticleResolver extends DocumentResolver {
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
export class InProceedingsResolver extends DocumentResolver {
  booktitle(document: UserDocument): string | null {
    return document.booktitle
  }
}

@injectable()
export class PhdThesisResolver extends DocumentResolver {
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
export class UnknownResolver extends DocumentResolver {}

export function resolvers(): Resolvers {
  return {
    Query: container.resolve(Query),
    Mutation: container.resolve(Mutation),
    Document: container.resolve(DocumentResolver),
    Article: container.resolve(ArticleResolver),
    InProceedings: container.resolve(InProceedingsResolver),
    PhdThesis: container.resolve(PhdThesisResolver),
    Unknown: container.resolve(UnknownResolver),
  }
}
