import type { PrismaClient } from '@prisma/client'
import {
  UserDocument as PlainUserDocument,
  Prisma,
  User,
  UserDocumentOtherField,
  JournalIssue,
  Journal,
} from '@prisma/client'
import { inject, injectable } from 'tsyringe'
import { DocumentFilters, UserDocumentsConnection } from '../graphql'

export type UserDocument = PlainUserDocument & {
  other?: UserDocumentOtherField[]
  journalIssue?:
    | (JournalIssue & {
        journal: Journal | null
      })
    | null
}

type UserDocumentsAndPageInfo = {
  documents: UserDocument[]
  hasNextPage: boolean
}

export type UserDocumentsResult = Omit<UserDocumentsConnection, 'edges'> & {
  edges: { node: UserDocument }[]
}

@injectable()
export class UserDocumentService {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

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
  ): Promise<UserDocumentsAndPageInfo> {
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

    const hasNextPage = !!(first && documents.length > first)
    const userDocuments = first ? documents.slice(0, first) : documents

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
        documents: searchResult,
        hasNextPage,
      }
    } else {
      return {
        documents: userDocuments,
        hasNextPage,
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
