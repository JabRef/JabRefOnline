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

export type PaginationResult = Omit<UserDocumentsConnection, 'edges'> & {
  edges: { node: UserDocument }[]
}

@injectable()
export class UserDocumentService {
  constructor(private prisma: PrismaClient) {}

  async getDocumentWithPagination(
    user: User | string,
    first: number,
    cursor: string,
    includeOtherFields = false
  ): Promise<PaginationResult> {
    const userId = typeof user === 'string' ? user : user.id
    console.log(first)
    const documents = await this.prisma.userDocument.findMany({
      take: first + 1,
      where: {
        users: {
          some: {
            id: userId,
          },
        },
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
    console.log('document', documents)
    const nextCursor = documents.length > first ? documents[first].id : ''
    return {
      edges: documents.slice(0, first).map((document) => ({ node: document })),
      pageInfo: {
        nextCursor,
      },
    }
  }

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
    includeOtherFields = false
  ): Promise<UserDocument[]> {
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
      include: {
        other: includeOtherFields,
        journalIssue: {
          include: {
            journal: true,
          },
        },
      },
    })

    if (filterBy?.query) {
      // Filtering documents by hand until Prisma.findMany supports full text search
      // TODO: https://github.com/prisma/prisma/issues/1684
      const query = new RegExp(filterBy.query, 'i')
      return documents.filter((document) => {
        return (
          query.test(document.title ?? '') || query.test(document.author ?? '')
        )
      })
    } else {
      return documents
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
