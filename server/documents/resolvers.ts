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
  Organization,
  Person,
  QueryUserDocumentArgs,
  Resolvers,
  UpdateUserDocumentInput,
} from '#graphql/resolver'
import { DocumentType } from '@prisma/client'
import { notEmpty } from '~/composables/util'
import { Context } from '../context'
import { ResolveType } from '../utils/extractResolveType'
import { inject, injectable, resolve } from './../tsyringe'
import {
  UserDocument,
  UserDocumentCreateInput,
  UserDocumentService,
} from './user.document.service'

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
  document:
    | AddJournalArticleInput
    | AddProceedingsArticleInput
    | AddThesisInput,
): UserDocumentCreateInput {
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
  const convertedDocument: UserDocumentCreateInput = {
    type,
    citationKeys: document.citationKeys ?? [],
    lastModified: document.lastModified ?? undefined,
    added: document.added ?? undefined,
    revisionNumber: undefined,
    title: document.title,
    subtitle: document.subtitle,
    titleAddon: document.titleAddon,
    abstract: document.abstract,
    authors: document.authors?.map((author) => author.person).filter(notEmpty),
    note: document.note,
    languages: document.languages ?? [],
    publicationState: document.publicationState,
    doi: document.doi,
    keywords: document.keywords ?? [],
    // TODO: editors: document.editors?.map((editor) => editor.person).filter(notEmpty),
    pageStart: 'pageStart' in document ? document.pageStart : null,
    pageEnd: 'pageEnd' in document ? document.pageEnd : null,
    electronicId: 'electronicId' in document ? document.electronicId : null,
    originalLanguages:
      'translated' in document
        ? document.translated?.originalLanguages ?? []
        : [],
    translators:
      'translated' in document
        ? document.translated?.translators
            ?.map((entity) => entity.person)
            .filter(notEmpty)
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
    private userDocumentService: UserDocumentService,
  ) {}

  async userDocument(
    _root: Record<string, never>,
    { id }: QueryUserDocumentArgs,
    _context: Context,
  ): Promise<UserDocument | null> {
    return await this.userDocumentService.getDocumentById(id, true)
  }
}

@injectable()
export class Mutation {
  constructor(
    @inject('UserDocumentService')
    private userDocumentService: UserDocumentService,
  ) {}

  async addUserDocument(
    _root: Record<string, never>,
    { input }: MutationAddUserDocumentArgs,
    _context: Context,
  ): Promise<UserDocument | null> {
    const document =
      input.journalArticle ?? input.proceedingsArticle ?? input.thesis
    const documentType = this.getDocumentType(input)
    if (!document || !documentType) {
      throw new Error('No document given')
    }
    return await this.userDocumentService.addDocument(
      convertDocumentInput(documentType, document),
    )
  }

  private getDocumentType(
    input: AddUserDocumentInput | UpdateUserDocumentInput,
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
    _context: Context,
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
      convertedDocument,
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

  authors(document: UserDocument): (Person | Organization)[] {
    if (document.contributors) {
      // TODO: Already store authors separately on save?
      return document.contributors
        .filter((contributor) => contributor.role === 'AUTHOR')
        .sort((a, b) => a.position - b.position)
        .map((contributor) => {
          return contributor.entity.type === 'PERSON'
            ? {
                ...contributor.entity,
                __typename: 'Person',
              }
            : {
                id: contributor.entity.id,
                name: contributor.entity.name ?? '',
                __typename: 'Organization',
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
      (field) => field.field === 'institution',
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
