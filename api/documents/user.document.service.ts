import {
  PrismaClient,
  UserDocument as PlainUserDocument,
  Prisma,
  User,
  UserDocumentOtherField,
  JournalIssue,
  Journal,
} from '@prisma/client'
import { injectable } from 'tsyringe'
import { DocumentFilters, UserDocumentsConnection } from '../graphql'

export type UserDocument = PlainUserDocument & {
  other?: UserDocumentOtherField[]
  journalIssue?:
    | (JournalIssue & {
        journal: Journal | null
      })
    | null
}

export type UserDocumentsResult = Omit<UserDocumentsConnection, 'edges'> & {
  edges: { node: UserDocument }[]
}

@injectable()
export class UserDocumentService {
  constructor(private prisma: PrismaClient) {}

  async getDocumentById(
    id: string,
    includeOtherFields = false
  ): Promise<UserDocument | null> {
    return await this.prisma.userDocument.findUnique({
      where: {
        id,
      },
      include: {
        other: includeOtherFields,
        journalIssue: {
          include: {
            journal: true,
          },
        },
      },
    })
  }

  async getDocumentsOf(
    user: User | string,
    filterBy: DocumentFilters | null = null,
    first: number | null = null,
    after: string | null = null,
    includeOtherFields = false
  ): Promise<UserDocumentsResult> {
    const userId = typeof user === 'string' ? user : user.id
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
      ...(after && {
        cursor: {
          id: after,
        },
        skip: 1,
      }),
      include: {
        other: includeOtherFields,
        journalIssue: {
          include: {
            journal: true,
          },
        },
      },
    })

    const endCursor =
      first && documents.length > first
        ? documents[documents.length - 2].id
        : documents.length
        ? documents[documents.length - 1].id
        : null

    const hasNextPage = !!(first && documents.length > first)

    if (filterBy?.query) {
      // Filtering documents by hand until Prisma.findMany supports full text search
      // TODO: https://github.com/prisma/prisma/issues/1684
      const query = new RegExp(filterBy.query, 'i')
      const searchResult = documents.filter((document) => {
        return (
          query.test(document.title ?? '') || query.test(document.author ?? '')
        )
      })
      return {
        edges: searchResult.map((document) => ({ node: document })),
        pageInfo: {
          endCursor: null,
          hasNextPage: false,
        },
      }
    } else {
      const userDocuments = first ? documents.slice(0, first) : documents
      return {
        edges: userDocuments.map((document) => ({ node: document })),
        pageInfo: {
          endCursor,
          hasNextPage,
        },
      }
    }
  }

  async addDocument(
    document: Prisma.UserDocumentCreateInput
  ): Promise<UserDocument | null> {
    return await this.prisma.userDocument.create({
      data: document,
      include: {
        journalIssue: {
          include: {
            journal: true,
          },
        },
      },
    })
  }

  async updateDocument(
    id: string,
    document: Prisma.UserDocumentUpdateInput
  ): Promise<UserDocument | null> {
    return await this.prisma.userDocument.update({
      where: {
        id,
      },
      data: document,
      include: {
        journalIssue: {
          include: {
            journal: true,
          },
        },
      },
    })
  }
}
