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

  async getSubgroupsOf(group: Group | string): Promise<Group[]> {
    const groupId = typeof group === 'string' ? group : group.id
    return await this.prisma.group.findMany({
      where: {
        parent: {
          id: groupId,
        },
      },
    })
  }

  async getParentOf(group: Group | string): Promise<Group | null> {
    const groupId = typeof group === 'string' ? group : group.id
    return await this.prisma.group.findFirst({
      where: {
        children: {
          some: {
            id: groupId,
          },
        },
      },
    })
  }

  async addGroup(group: Prisma.GroupCreateInput): Promise<Group | null> {
    return await this.prisma.group.create({ data: group })
  }

  async updateGroup(
    group: Omit<Prisma.GroupUpdateInput, 'id'> & { id: string }
  ): Promise<Group | null> {
    return await this.prisma.group.update({
      data: group,
      where: {
        id: group.id,
      },
    })
  }
}
