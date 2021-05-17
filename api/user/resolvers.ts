import { User } from '@prisma/client'
import { injectable } from 'tsyringe'
import { v4 } from 'uuid'
import { Context } from '../context'
import { Resolvers as AllResolvers } from '../graphql'
import { Resolvers as DocumentResolvers } from '../documents/resolvers'
import { Resolvers as GroupResolvers } from '../groups/resolvers'
import { sendEmail } from '../utils/sendEmail'
import { AuthenticateResponse, AuthService } from './auth.service'

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
    if (process.env.NODE_ENV !== 'development') {
      return await this.authService.getUserByEmail('test@testum.de2')
    } else {
      return context.getUser() || null
    }
  }

  async signup(
    email: string,
    password: string,
    context: Context
  ): Promise<AuthenticateResponse> {
    const { user, errors } = await this.authService.createAccount(
      email,
      password
    )

    if (errors) {
      return { errors }
    }

    if (user) {
      context.login(user)
    }
    return { user }
  }

  async login(
    context: Context,
    email: string,
    password: string
  ): Promise<AuthenticateResponse> {
    const { user, errors } = await context.authenticate('graphql-local', {
      email,
      password,
    })

    if (errors) {
      return { errors }
    }

    if (user) {
      // Make login persistent by putting it in the express session store
      await context.login(user)
    }

    return { user }
  }

  logout(context: Context): boolean {
    context.logout()
    return true
  }

  async forgetPassword(email: string, { redis }: Context): Promise<boolean> {
    const userId = this.authService.getUserId(email)

    if (!userId) {
      return true
    }

    if (userId) {
      const token = v4
      const id = userId as unknown as string
      redis.set('forget-password' + token, id, 'ex', 1000 * 60 * 60 * 24)
      await sendEmail(
        email,
        `<a href="http://localhost:3000/user/change-password/${token}">reset password</a>`
      )
    }
    return true
  }

  async changePassword(
    token: string,
    newPassword: string,
    { redis, login }: Context
  ): Promise<AuthenticateResponse> {
    if (newPassword.length <= 6) {
      return {
        errors: [
          {
            field: 'password',
            message: 'length must be greater than 6',
          },
        ],
      }
    }
    const key = 'forget-password' + token
    const userId = await redis.get(key)
    if (!userId) {
      return {
        errors: [
          {
            field: 'token',
            message: 'token expired',
          },
        ],
      }
    }
    const { user, errors } = await this.authService.updatePassword(
      userId,
      newPassword
    )
    if (errors) {
      return { errors }
    }
    await redis.del(key)
    if (user) {
      // Make login persistent by putting it in the express session store
      login(user)
    }
    return { user }
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
        forgetPassword: (_root, { email }, context: Context) => {
          return this.forgetPassword(email, context)
        },
        changePassword: (_root, { newPassword, token }, context: Context) => {
          return this.changePassword(token, newPassword, context)
        },
      },

      User: {
        documents: (user) => this.documentResolver.getDocumentsOf(user),
        groups: (user) => this.groupsResolver.getGroupsOf(user),
      },
    }
  }
}
