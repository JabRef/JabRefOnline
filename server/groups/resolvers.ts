import type { Group, GroupType as GroupTypeT } from '@prisma/client'
import { UserInputError } from 'apollo-server-errors'
// eslint-disable-next-line import/default
import prisma from '@prisma/client'
import { Context } from '../context'
import {
  MutationCreateGroupArgs,
  MutationUpdateGroupArgs,
  QueryGroupArgs,
  Resolvers,
} from '../graphql'
import { inject, injectable, resolve } from './../tsyringe'
import { GroupService } from './service'
const { GroupType, GroupHierarchyType } = prisma

export type GroupResolved = Group & {
  parent: GroupResolved | null
  children: GroupResolved[]
}

export type GroupMaybeResolved = Group | GroupResolved

@injectable()
export class Query {
  constructor(@inject('GroupService') private groupService: GroupService) {}

  async group(
    _root: Record<string, never>,
    { id }: QueryGroupArgs,
    _context: Context
  ): Promise<Group | null> {
    return await this.groupService.getGroupById(id)
  }
}

@injectable()
export class Mutation {
  constructor(@inject('GroupService') private groupService: GroupService) {}

  async createGroup(
    _root: Record<string, never>,
    { input: group }: MutationCreateGroupArgs,
    context: Context
  ): Promise<Group | null> {
    let type = null
    let field = null
    let keywordDelimiter = null
    let keywordHierarchicalDelimiter = null
    let documents: string[] = []
    let authorLastName = null
    let searchExpression = null
    let caseSensitive = null
    let onlySplitWordsAtDelimiter = null
    let isRegEx = null
    let paths = null

    if (group.automaticKeywordGroup) {
      type = GroupType.AutomaticKeywordGroup
      field = group.automaticKeywordGroup.field
      keywordDelimiter = group.automaticKeywordGroup.keywordDelimiter
      keywordHierarchicalDelimiter =
        group.automaticKeywordGroup.keywordHierarchicalDelimiter
    } else if (group.automaticPersonsGroup) {
      type = GroupType.AutomaticPersonsGroup
      field = group.automaticPersonsGroup.field
    } else if (group.explicitGroup) {
      type = GroupType.ExplicitGroup
      keywordDelimiter = group.explicitGroup.keywordDelimiter
      documents = group.explicitGroup.documentIds
    } else if (group.lastNameGroup) {
      type = GroupType.LastNameGroup
      field = group.lastNameGroup.field
      authorLastName = group.lastNameGroup.authorLastName
    } else if (group.wordKeywordGroup) {
      type = GroupType.WordKeywordGroup
      field = group.wordKeywordGroup.field
      searchExpression = group.wordKeywordGroup.searchExpression
      caseSensitive = group.wordKeywordGroup.caseSensitive
      keywordDelimiter = group.wordKeywordGroup.keywordDelimiter
      onlySplitWordsAtDelimiter =
        group.wordKeywordGroup.onlySplitWordsAtDelimiter
    } else if (group.regexKeywordGroup) {
      type = GroupType.RegexKeywordGroup
      field = group.regexKeywordGroup.field
      searchExpression = group.regexKeywordGroup.searchExpression
      caseSensitive = group.regexKeywordGroup.caseSensitive
    } else if (group.searchGroup) {
      type = GroupType.SearchGroup
      searchExpression = group.searchGroup.searchExpression
      caseSensitive = group.searchGroup.caseSensitive
      isRegEx = group.searchGroup.isRegEx
    } else if (group.texGroup) {
      type = GroupType.TexGroup
      paths = group.texGroup.paths
    }

    if (type === null) {
      throw new UserInputError(
        'Need to specify at least one of the type-specific details.'
      )
    }

    return await this.groupService.addGroup({
      users: {
        connect: {
          id: context.getUser()?.id,
        },
      },
      name: group.name,
      displayName: group.displayName ?? group.name,
      ...(group.parentId !== null && {
        parent: {
          connect: {
            id: group.parentId,
          },
        },
      }),
      // TODO: Subgroups

      hierarchyType: group.hierarchyType ?? GroupHierarchyType.INDEPENDENT,
      color: group.color,
      description: group.description,
      icon: group.icon,
      isExpanded: group.isExpanded ?? true,

      type,
      explicitDocuments: {
        connect: documents.map((id) => ({ id })),
      },
      field,
      keywordDelimiter,
      keywordHierarchicalDelimiter,
      authorLastName,
      searchExpression,
      caseSensitive,
      onlySplitWordsAtDelimiter,
      isRegEx,
      // TODO: paths,
    })
  }

  async updateGroup(
    _root: Record<never, string>,
    { input: group }: MutationUpdateGroupArgs,
    _context: Context
  ): Promise<Group | null> {
    return await this.groupService.updateGroup({
      id: group.id,
      name: group.name || undefined,
      // TODO: Remaining properties
    })
  }
}

@injectable()
export class GroupResolver {
  constructor(@inject('GroupService') private groupService: GroupService) {}

  __resolveType(group: GroupMaybeResolved): GroupTypeT {
    return group.type
  }

  async children(group: GroupMaybeResolved): Promise<GroupMaybeResolved[]> {
    if ('children' in group) {
      return group.children
    } else {
      return await this.groupService.getSubgroupsOf(group)
    }
  }

  async parent(group: GroupMaybeResolved): Promise<GroupMaybeResolved | null> {
    if ('parent' in group) {
      return group.parent
    } else {
      return await this.groupService.getParentOf(group)
    }
  }
}

export function resolvers(): Resolvers {
  return {
    Query: resolve('GroupQuery'),
    Mutation: resolve('GroupMutation'),
    Group: resolve('GroupResolver'),
  }
}
