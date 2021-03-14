import { PrismaClient } from '@prisma/client'
import { UserResolvers, QueryResolvers, MutationResolvers } from '../graphql'
import { AuthService } from '../passport/auth.service'

const authService = new AuthService(new PrismaClient())

export const userResolver: UserResolvers = {
  id: ({ id }) => id,
  email: ({ email }) => email,
}

export const queryResolvers: QueryResolvers = {
  async user(_root, { id }, _context) {
    return await authService.getUserById(id)
  },

  currentUser(_root, _args, context) {
    return context.getUser() || null
  },
}

export const mutationResolvers: MutationResolvers = {
  logout(_root, _args, context) {
    context.logout()
    return true
  },

  async login(_root, { email, password }, context) {
    const { user } = await context.authenticate('graphql-local', {
      email,
      password,
    })
    if (user) {
      await context.login(user)
      return user
    } else {
      return null
    }
  },

  async signup(_root, { email, password }, context) {
    const newUser = await authService.createAccount(email, password)
    context.login(newUser)
    return newUser
  },
}
