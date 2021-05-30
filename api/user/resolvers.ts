import { User } from '@prisma/client'
import { container, injectable } from 'tsyringe'
import { Context } from '../context'
import {
  MutationLoginArgs,
  MutationSignupArgs,
  QueryUserArgs,
  Resolvers,
} from '../graphql'
import { Resolvers as DocumentResolvers } from '../documents/resolvers'
import { GroupResolved, Resolvers as GroupResolvers } from '../groups/resolvers'
import { UserDocument } from '../documents/user.document.service'
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

  async me(
    _root: Record<string, never>,
    _args: Record<string, never>,
    context: Context
  ): Promise<User | null> {
    if (process.env.NODE_ENV === 'development') {
      return await this.authService.getUserByEmail('test@testum.de2')
    } else {
      return context.getUser() || null
    }
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
    context.login(newUser)
    return newUser
  }

  async login(
    _root: Record<string, never>,
    { email, password }: MutationLoginArgs,
    context: Context
  ): Promise<User | null> {
    const { user } = await context.authenticate('graphql-local', {
      email,
      password,
    })
    if (user) {
      // Make login persistent by putting it in the express session store
      await context.login(user)
      return user
    } else {
      return null
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
}

@injectable()
export class UserResolver {
  constructor(
    private documentResolver: DocumentResolvers,
    private groupsResolver: GroupResolvers
  ) {}

  documentsRaw(user: User): Promise<UserDocument[]> {
    return this.documentResolver.getDocumentsOf(user)
  }

  documents(user: User): Promise<UserDocument[]> {
    return this.documentResolver.getDocumentsOf(user)
  }

  groups(user: User): Promise<GroupResolved[]> {
    return this.groupsResolver.getGroupsOf(user)
  }
}

export function resolvers(): Resolvers {
  return {
    Query: container.resolve(Query),
    Mutation: container.resolve(Mutation),
    User: container.resolve(UserResolver),
  }
}
