import {
  AddPersonInput,
  DocumentFilters,
  UserChangesCursorInput,
  UserDocumentsConnection,
} from '#graphql/resolver'
import {
  ContributorRole,
  DocumentContributor,
  Entity,
  EntityType,
  Journal,
  JournalIssue,
  Prisma,
  PrismaClient,
  User,
  UserDocument as PlainUserDocument,
  UserDocumentOtherField,
} from '@prisma/client'
import { unsecureHash } from '../utils/crypto'
import { inject, injectable } from './../tsyringe'

export type UserDocument = PlainUserDocument & {
  other?: UserDocumentOtherField[]
  journalIssue?:
    | (JournalIssue & {
        journal: Journal | null
      })
    | null
  contributors: (DocumentContributor & {
    entity: Entity
  })[]
}

type UserDocumentsAndPageInfo = {
  documents: UserDocument[]
  hasNextPage: boolean
}

export type UserDocumentsResult = Omit<UserDocumentsConnection, 'edges'> & {
  edges: { node: UserDocument }[]
}

export type UserDocumentCreateInput = Omit<
  Prisma.UserDocumentCreateInput,
  'revisionHash' | 'contributors'
> & {
  authors?: AddPersonInput[]
  editors?: AddPersonInput[]
  translators?: AddPersonInput[]
}

export type UserDocumentUpdateInput = Omit<
  Prisma.UserDocumentUpdateInput,
  'contributors'
> & {
  authors?: AddPersonInput[]
  editors?: AddPersonInput[]
  translators?: AddPersonInput[]
}

@injectable()
export class UserDocumentService {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  getRevisionHash(
    document:
      | UserDocument
      | (UserDocumentCreateInput & { revisionHash?: string })
  ): string {
    const { revisionNumber, revisionHash, ...documentWithoutRevision } =
      document
    return unsecureHash(documentWithoutRevision)
  }

  async getDocumentById(
    id: string,
    includeOtherFields = false
  ): Promise<UserDocument | null> {
    const document = await this.prisma.userDocument.findUnique({
      where: {
        id,
      },
      include: createInclude(includeOtherFields),
    })
    return document
  }

  async getDocumentsOf(
    user: User | string,
    filterBy: DocumentFilters | null = null,
    first: number | null = null,
    after: string | null = null,
    includeOtherFields = false
  ): Promise<UserDocumentsAndPageInfo> {
    const userId = typeof user === 'string' ? user : user.id
    const cursor = after ? { id: after } : null
    const documents = await this.prisma.userDocument.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
        ...(filterBy?.groupId != null && {
          explicitGroups: {
            some: {
              id: filterBy.groupId,
            },
          },
        }),
      },

      ...(first && {
        take: first + 1,
      }),
      ...(cursor && {
        cursor,
        skip: 1,
      }),
      include: createInclude(includeOtherFields),
    })

    const hasNextPage = !!(first && documents.length > first)

    if (filterBy?.query) {
      // Filtering documents by hand until Prisma.findMany supports full text search
      // TODO: https://github.com/prisma/prisma/issues/1684
      const query = new RegExp(filterBy.query, 'i')
      const searchResult = documents.filter((document) => {
        return (
          query.test(document.title ?? '') ||
          document.contributors.some((contributor) =>
            query.test(
              contributor.entity.name ?? contributor.entity.family ?? ''
            )
          )
        )
      })
      return {
        documents: searchResult,
        hasNextPage,
      }
    } else {
      const userDocuments = first ? documents.slice(0, first) : documents
      return {
        documents: userDocuments,
        hasNextPage,
      }
    }
  }

  async getChangedDocumentsOf(
    user: User | string,
    first: number | null = null,
    after: UserChangesCursorInput | null = null,
    includeOtherFields = false
  ): Promise<UserDocumentsAndPageInfo> {
    const userId = typeof user === 'string' ? user : user.id
    const documents = await this.prisma.userDocument.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      orderBy: [{ lastModified: 'asc' }, { id: 'asc' }],
      ...(first && {
        take: first + 1,
      }),
      ...(after && { cursor: { checkpoint: after } }),
      skip: 1,
      include: createInclude(includeOtherFields),
    })

    return {
      documents: first ? documents.slice(0, first) : documents,
      hasNextPage: !!(first && documents.length > first),
    }
  }

  async addDocument(
    document: UserDocumentCreateInput
  ): Promise<UserDocument | null> {
    const data = {
      ...document,
      revisionHash: this.getRevisionHash(document),
      contributors: {
        create: document.authors?.map((author, index) => ({
          entity: {
            create: {
              ...author,
              type: EntityType.PERSON,
            },
          },
          position: index,
          role: ContributorRole.AUTHOR,
        })),
      },
    }
    delete data.authors
    delete data.editors
    delete data.translators
    return await this.prisma.userDocument.create({
      data,
      include: createInclude(false),
    })
  }

  async updateDocument(
    id: string,
    document: UserDocumentUpdateInput
  ): Promise<UserDocument | null> {
    await this.prisma.documentContributor.deleteMany({
      where: {
        documentId: id,
      },
    })
    const data = {
      ...document,
      contributors: {
        create: document.authors?.map((author, index) => ({
          entity: {
            create: {
              ...author,
              type: EntityType.PERSON,
            },
          },
          position: index,
          role: ContributorRole.AUTHOR,
        })),
      },
    }
    delete data.authors
    delete data.editors
    delete data.translators
    return await this.prisma.userDocument.update({
      where: {
        id,
      },
      data,
      include: createInclude(false),
    })
  }
}

function createInclude(includeOtherFields: boolean): {
  contributors: { include: { entity: true } }
  other: boolean
  journalIssue: { include: { journal: true } }
} {
  return {
    contributors: {
      include: {
        entity: true,
      },
    },
    other: includeOtherFields,
    journalIssue: {
      include: {
        journal: true,
      },
    },
  }
}
