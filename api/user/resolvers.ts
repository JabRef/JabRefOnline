import { promisify } from 'util'
import { User } from '@prisma/client'
import { injectable } from 'tsyringe'
import { RedisClient } from 'redis'
import { v4 } from 'uuid'
import { Context } from '../context'
import { Resolvers as AllResolvers } from '../graphql'
import { Resolvers as DocumentResolvers } from '../documents/resolvers'
import { Resolvers as GroupResolvers } from '../groups/resolvers'
import { sendEmail } from '../utils/sendEmail'
import { AuthService } from './auth.service'

@injectable()
export class Resolvers {
  constructor(
    private authService: AuthService,
    private documentResolver: DocumentResolvers,
    private groupsResolver: GroupResolvers,
    private redisClient: RedisClient
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

  async forgotPassword(email: string): Promise<boolean> {
    const userId = await this.authService.getUserId(email)
    if (!userId) {
      return true
    }

    if (userId) {
      const token = v4()
      this.redisClient.set(
        'forgot-password' + token,
        userId,
        'ex',
        1000 * 60 * 60 * 24
      ) // VALID FOR ONE DAY
      // TODO: ADD BETTER TEMPLATE FOR THE EMAIL
      await sendEmail(
        email,
        `<a href="http://localhost:3000/change-password/${token}">Reset password</a>`
      )
    }
    return true
  }

  async changePassword(
    token: string,
    newPassword: string,
    context: Context
  ): Promise<User | null> {
    if (newPassword.length <= 6) {
      return null
    }
    const key = 'forgot-password' + token
    const getAsync = promisify(this.redisClient.GET).bind(this.redisClient)
    const userId = await getAsync(key)
    if (!userId) {
      return null
    }
    const user = await this.authService.updatePassword(userId, newPassword)
    this.redisClient.del(key)
    if (user) {
      // Make login persistent by putting it in the express session store
      context.login(user)
    }
    return user
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
        forgotPassword: (_root, { email }, _context) => {
          return this.forgotPassword(email)
        },
        changePassword: (_root, { token, newPassword }, context) => {
          return this.changePassword(token, newPassword, context)
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
