import { User } from '@prisma/client'
import { injectable } from 'tsyringe'
import { Resolvers as AllResolvers, Group } from '../graphql'
import { GroupService } from './service'

@injectable()
export class Resolvers {
  constructor(private groupService: GroupService) {}

  async getGroupsOf(user: User): Promise<Group[]> {
    const groups = await this.groupService.getGroupsOf(user)
    const groupsById = new Map<string, Group & { parentId: string | null }>()
    groups.forEach((group) =>
      groupsById.set(group.id, {
        id: group.id,
        parentId: group.parentId,
        name: group.name,
        children: [],
        color: group.color,
        description: group.description,
        icon: group.icon,
        documents: [],
      })
    )
    const roots: Group[] = []

    groupsById.forEach((group) => {
      if (group.parentId === null) {
        roots.push(group)
      } else {
        groupsById.get(group.parentId)?.children.push(group)
      }
    })
    return roots
  }

  /*
  async getUserDocumentRaw(id: string): Promise<DocumentRaw | null> {
    const document = await this.groupService.getDocumentById(id)
    if (document) {
      return convertToRaw(document)
    } else {
      return null
    }
  }

  async addUserDocumentRaw(
    document: DocumentRawInput
  ): Promise<DocumentRaw | null> {
    const addedDocument = await this.groupService.addDocument(
      convertFromRaw(document)
    )
    if (addedDocument) {
      return convertToRaw(addedDocument)
    } else {
      return null
    }
  }
  */

  resolvers(): AllResolvers {
    return {
      Query: {
        /*
        getUserDocumentRaw: (_parent, { id }, _context) =>
          this.getUserDocumentRaw(id),
        */
      },

      Mutation: {
        /*
        addUserDocumentRaw: (_parent, { document }, _context) =>
          this.addUserDocumentRaw(document),
        */
      },
    }
  }
}
