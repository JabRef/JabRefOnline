import { Group, Prisma, PrismaClient, User } from '@prisma/client'
import { injectable } from 'tsyringe'

@injectable()
export class GroupService {
  constructor(private prisma: PrismaClient) {}

  async getGroupById(id: string): Promise<Group | null> {
    return await this.prisma.group.findUnique({
      where: {
        id,
      },
    })
  }

  async getGroupsOf(user: User | string): Promise<Group[]> {
    const userId = typeof user === 'string' ? user : user.id
    return await this.prisma.group.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    })
  }

  async addGroup(group: Prisma.GroupCreateInput): Promise<Group | null> {
    return await this.prisma.group.create({ data: group })
  }
}
