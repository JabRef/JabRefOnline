import { PrismaClient, UserDocument, Prisma } from '@prisma/client'
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

  async addDocument(
    document: Prisma.UserDocumentCreateInput
  ): Promise<UserDocument | null> {
    return await this.prisma.userDocument.create({ data: document })
  }
}
