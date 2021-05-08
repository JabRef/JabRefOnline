import {
  PrismaClient,
  UserDocument as PlainUserDocument,
  Prisma,
  User,
  UserDocumentOtherField,
} from '@prisma/client'
import { injectable } from 'tsyringe'

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
    includeOtherFields = false
  ): Promise<UserDocument[]> {
    const userId = typeof user === 'string' ? user : user.id
    return await this.prisma.userDocument.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        other: includeOtherFields,
      },
    })
  }

  async addDocument(
    document: Prisma.UserDocumentCreateInput
  ): Promise<UserDocument | null> {
    return await this.prisma.userDocument.create({ data: document })
  }
}
