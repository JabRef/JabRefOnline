import { User } from '@prisma/client'
import { injectable } from 'tsyringe'
import { Context } from '../context'
import { Resolvers as AllResolvers } from '../graphql'
import { Resolvers as DocumentResolvers } from '../documents/resolvers'
import { Resolvers as GroupResolvers } from '../groups/resolvers'
import { AuthService } from './auth.service'

@injectable()
export class Resolvers {
  constructor(
    private authService: AuthService,
    private documentResolver: DocumentResolvers,
    private groupsResolver: GroupResolvers
  ) {}

  async getUserById(id: string): Promise<User | null> {
    return await this.authService.getUserById(id)
  }

  async me(context: Context): Promise<User | null> {
    if (process.env.NODE_ENV === 'development') {
      return await this.authService.getUserByEmail('test@testum.de2')
    } else {
      return context.getUser() || null
    }
  }

  async signup(
    email: string,
    password: string,
    context: Context
  ): Promise<User> {
    const newUser = await this.authService.createAccount(email, password)
    context.login(newUser)
    return newUser
  }

  async login(
    context: Context,
    email: string,
    password: string
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

  logout(context: Context): boolean {
    context.logout()
    return true
  }

  resolvers(): AllResolvers {
    return {
      Query: {
        user: (_root, { id }, _context) => {
          return this.getUserById(id)
        },
        me: (_root, _args, context) => {
          return this.me(context)
        },
      },

      Mutation: {
        logout: (_root, _args, context) => {
          return this.logout(context)
        },

        login: (_root, { email, password }, context) => {
          return this.login(context, email, password)
        },

        signup: (_root, { email, password }, context) => {
          return this.signup(email, password, context)
        },
      },

      User: {
        documentsRaw: (user) => this.documentResolver.getDocumentsOf(user),
        documents: (user) => this.documentResolver.getDocumentsOf(user),
        groups: (user) => this.groupsResolver.getGroupsOf(user),
      },
    }
  }
}
