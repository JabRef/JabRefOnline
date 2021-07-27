import {
  PrismaClient,
  UserDocument as PlainUserDocument,
  Prisma,
  User,
  UserDocumentOtherField,
} from '@prisma/client'
import { injectable } from 'tsyringe'
import { DocumentFilters } from '../graphql'

export type UserDocument = PlainUserDocument & {
  other?: UserDocumentOtherField[]
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
    return await this.prisma.userDocument.create({ data: document })
  }
}
