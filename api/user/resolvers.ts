import { PrismaClient, User } from '@prisma/client'
import { injectable } from 'tsyringe'
import { Context } from '../context'
import { UserResolvers, QueryResolvers, MutationResolvers } from '../graphql'
import { AuthService } from './auth.service'

const authService = new AuthService(new PrismaClient())

@injectable()
export class Resolvers {
  constructor(private authService: AuthService) {}

  async getUserById(id: string): Promise<User | null> {
    return await authService.getUserById(id)
  }

  me(context: Context): User {
    return context.getUser() || null
  }

  async signup(
    email: string,
    password: string,
    context: Context
  ): Promise<User> {
    const newUser = await authService.createAccount(email, password)
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

  queryResolvers(): QueryResolvers {
    return {
      user: (_root, { id }, _context) => {
        return this.getUserById(id)
      },
      me: (_root, _args, context) => {
        return this.me(context)
      },
    }
  }

  mutationResolvers(): MutationResolvers {
    return {
      logout: (_root, _args, context) => {
        return this.logout(context)
      },

      login: (_root, { email, password }, context) => {
        return this.login(context, email, password)
      },

      signup: (_root, { email, password }, context) => {
        return this.signup(email, password, context)
      },
    }
  }

  userResolver(): UserResolvers {
    return {
      id: ({ id }) => id,
      email: ({ email }) => email,
    }
  }
}
