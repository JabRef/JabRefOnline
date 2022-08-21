import { DocumentType, Prisma } from '@prisma/client'
import { Context } from '../context'
import {
  AddJournalArticleInput,
  AddProceedingsArticleInput,
  AddThesisInput,
  AddUserDocumentInput,
  DocumentResolvers,
  Institution,
  JournalIssue,
  MutationAddUserDocumentArgs,
  MutationUpdateUserDocumentArgs,
  Person,
  QueryUserDocumentArgs,
  Resolvers,
  UpdateUserDocumentInput,
} from '../graphql'
import { ResolveType } from '../utils/extractResolveType'
import { inject, injectable, resolve } from './../tsyringe'
import { UserDocument, UserDocumentService } from './user.document.service'

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
  type: DocumentType,
  document: AddJournalArticleInput | AddProceedingsArticleInput | AddThesisInput
): Prisma.UserDocumentCreateInput {
  /* TODO: Save those fields as well
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
    */
  const convertedDocument: Prisma.UserDocumentCreateInput = {
    type,
    citationKeys: document.citationKeys ?? [],
    lastModified: document.lastModified ?? null,
    added: document.added ?? null,
    title: document.title,
    subtitle: document.subtitle,
    titleAddon: document.titleAddon,
    abstract: document.abstract,
    author: document.authors
      ?.map((author) => author.person?.name)
      .join(' and '),
    note: document.note,
    languages: document.languages ?? [],
    publicationState: document.publicationState,
    doi: document.doi,
    keywords: document.keywords ?? [],
    pageStart: 'pageStart' in document ? document.pageStart : null,
    pageEnd: 'pageEnd' in document ? document.pageEnd : null,
    electronicId: 'electronicId' in document ? document.electronicId : null,
    originalLanguages:
      'translated' in document
        ? document.translated?.originalLanguages ?? []
        : [],
    translators:
      'translated' in document
        ? document.translated?.translators?.map(
            (entity) => entity.person?.name ?? ''
          ) ?? []
        : [],
    publishedAt: 'published' in document ? document.published : null,
    /*
    ...(other &&
      other.length > 0 && {
        other: {
          createMany: {
            data: other,
          },
        },
      }),
      */
  }

  if ('in' in document && document.in && typeof document.in !== 'string') {
    convertedDocument.journalIssue = {
      create: {
        journal: {
          create: {
            name: document.in.journal.name,
            subtitle: document.in.journal.subtitle,
            titleAddon: document.in.journal.titleAddon,
            issn: document.in.journal.issn,
          },
        },
        title: document.in.title,
        subtitle: document.in.subtitle,
        titleAddon: document.in.titleAddon,
        number: document.in.number,
        name: document.in.name,
        series: document.in.series,
        volume: document.in.volume,
      },
    }
  }

  /*
  if (special) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    convertedDocument = Object.assign(
      convertedDocument,
      Object.fromEntries(special)
    )
  }
  */
  // TODO: For update
  /*
  if ('id' in document) {
    convertedDocument = Object.assign(convertedDocument, { id: document.id })
  }
  */

  return convertedDocument
}

@injectable()
export class Query {
  constructor(
    @inject('UserDocumentService')
    private userDocumentService: UserDocumentService
  ) {}

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
  constructor(
    @inject('UserDocumentService')
    private userDocumentService: UserDocumentService
  ) {}

  async addUserDocument(
    _root: Record<string, never>,
    { input }: MutationAddUserDocumentArgs,
    _context: Context
  ): Promise<UserDocument | null> {
    const document =
      input.journalArticle ?? input.proceedingsArticle ?? input.thesis
    const documentType = this.getDocumentType(input)
    if (!document || !documentType) {
      throw new Error('No document given')
    }
    return await this.userDocumentService.addDocument(
      convertDocumentInput(documentType, document)
    )
  }

  private getDocumentType(
    input: AddUserDocumentInput | UpdateUserDocumentInput
  ): DocumentType | null {
    if (input.journalArticle) {
      return 'JOURNAL_ARTICLE'
    } else if (input.proceedingsArticle) {
      return 'PROCEEDINGS_ARTICLE'
    } else if (input.thesis) {
      return 'THESIS'
    }
    return null
  }

  async updateUserDocument(
    _root: Record<string, never>,
    { input }: MutationUpdateUserDocumentArgs,
    _context: Context
  ): Promise<UserDocument | null> {
    const document =
      input.journalArticle ?? input.proceedingsArticle ?? input.thesis
    const documentType = this.getDocumentType(input)
    if (!document || !documentType) {
      throw new Error('No document given')
    }

    const convertedDocument = convertDocumentInput(documentType, document)
    convertedDocument.id = input.id
    return await this.userDocumentService.updateDocument(
      input.id,
      convertedDocument
    )
  }
}

@injectable()
export class DocumentResolver {
  __resolveType(document: UserDocument): ResolveType<DocumentResolvers> {
    switch (document.type) {
      case 'JOURNAL_ARTICLE':
        return 'JournalArticle'
      case 'PROCEEDINGS_ARTICLE':
        return 'ProceedingsArticle'
      case 'THESIS':
        return 'Thesis'
      case 'OTHER':
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
    return document.keywords
  }
}

@injectable()
export class JournalArticleResolver extends DocumentResolver {
  in(document: UserDocument): JournalIssue | null {
    return document.journalIssue ?? null
  }

  published(document: UserDocument): string | null {
    return document.publishedAt
  }

  annotators(_document: UserDocument): Person[] {
    return []
  }

  commentators(_document: UserDocument): Person[] {
    return []
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
        locations: [],
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
    Query: resolve('DocumentQuery'),
    Mutation: resolve('DocumentMutation'),
    Document: resolve('DocumentResolver'),
    JournalArticle: resolve('JournalArticleResolver'),
    ProceedingsArticle: resolve('ProceedingsArticleResolver'),
    Thesis: resolve('ThesisResolver'),
    Other: resolve('OtherResolver'),
  }
}
