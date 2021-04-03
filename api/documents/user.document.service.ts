import { PrismaClient, UserDocument, Prisma, User } from '@prisma/client'
import { injectable } from 'tsyringe'

@injectable()
export class UserDocumentService {
  constructor(private prisma: PrismaClient) {}

  async getDocumentById(id: string): Promise<UserDocument | null> {
    return await this.prisma.userDocument.findUnique({
      where: {
        id,
      },
    })
  }

  async getDocumentsOf(user: User | string): Promise<UserDocument[]> {
    const userId = typeof user === 'string' ? user : user.id
    return await this.prisma.userDocument.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    })
  }

  async addDocument(
    document: Prisma.UserDocumentCreateInput
  ): Promise<UserDocument | null> {
    return await this.prisma.userDocument.create({ data: document })
  }
}
