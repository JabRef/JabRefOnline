import { User } from '@prisma/client'
import { container, injectable } from 'tsyringe'
import { UserInputError } from 'apollo-server-express'
import { Context } from '../context'
import {
  MutationLoginArgs,
  MutationSignupArgs,
  MutationChangePasswordArgs,
  MutationForgotPasswordArgs,
  QueryUserArgs,
  Resolvers,
  UserDocumentsArgs,
} from '../graphql'
import { GroupResolved } from '../groups/resolvers'
import {
  UserDocument,
  UserDocumentService,
} from '../documents/user.document.service'
import { GroupService } from '../groups/service'
import { AuthService } from './auth.service'

@injectable()
export class Query {
  constructor(private authService: AuthService) {}

  async user(
    _root: Record<string, never>,
    { id }: QueryUserArgs,
    _context: Context
  ): Promise<User | null> {
    return await this.authService.getUserById(id)
  }

  me(
    _root: Record<string, never>,
    _args: Record<string, never>,
    context: Context
  ): User | null {
    return context.getUser() || null
  }
}

@injectable()
export class Mutation {
  constructor(private authService: AuthService) {}

  async signup(
    _root: Record<string, never>,
    { email, password }: MutationSignupArgs,
    context: Context
  ): Promise<User> {
    const newUser = await this.authService.createAccount(email, password)
    await context.login(newUser)
    return newUser
  }

  async login(
    _root: Record<string, never>,
    { email, password }: MutationLoginArgs,
    context: Context
  ): Promise<User | null> {
    const { user, info } = await context.authenticate('graphql-local', {
      email,
      password,
    })
    if (user) {
      // Make login persistent by putting it in the express session store
      await context.login(user)
      return user
    } else {
      throw new UserInputError(
        info?.message || 'Unknown error while logging in.'
      )
    }
  }

  logout(
    _root: Record<string, never>,
    _args: Record<string, never>,
    context: Context
  ): boolean {
    context.logout()
    return true
  }

  async forgotPassword(
    _root: Record<string, never>,
    { email }: MutationForgotPasswordArgs,
    _context: Context
  ): Promise<boolean> {
    return await this.authService.resetPassword(email)
  }

  async changePassword(
    _root: Record<string, never>,
    { token, id, newPassword }: MutationChangePasswordArgs,
    _context: Context
  ): Promise<User | null> {
    return await this.authService.updatePassword(token, id, newPassword)
  }
}

@injectable()
export class UserResolver {
  constructor(
    private userDocumentService: UserDocumentService,
    private groupService: GroupService
  ) {}

  async documents(
    user: User,
    { filterBy }: UserDocumentsArgs
  ): Promise<UserDocument[]> {
    return await this.userDocumentService.getDocumentsOf(user, filterBy, true)
  }

  async groups(user: User): Promise<GroupResolved[]> {
    const groups = await this.groupService.getGroupsOf(user)
    const groupsById = new Map<string, GroupResolved>()
    groups.forEach((group) =>
      groupsById.set(group.id, { ...group, parent: null, children: [] })
    )
    const roots: GroupResolved[] = []

    groupsById.forEach((group) => {
      if (group.parentId === null) {
        roots.push(group)
      } else {
        const parent = groupsById.get(group.parentId)
        parent?.children.push(group)
        group.parent = parent ?? null
      }
    })
    return roots
  }
}

export function resolvers(): Resolvers {
  return {
    Query: container.resolve(Query),
    Mutation: container.resolve(Mutation),
    User: container.resolve(UserResolver),
  }
}
