import { UserResolvers, QueryResolvers, MutationResolvers } from '../graphql'
import { Context } from '../context'
import { User } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

export const userResolver: UserResolvers = {
  id: ({ id }) => id,
  name: ({ name }) => name
}

export const queryUserByID: QueryResolvers<Context>['user'] = async (_root, args, context) => {
  const user = await context.prisma.user.findUnique({
    where: {
      id: args.id
    }
  })
  return user
  // TODO: Reuse AuthService#getUserById
}

export const getCurrentUser: QueryResolvers<Context>['currentUser'] = (_root, _args, context) => {
  return context.getUser() || null
}

export const logoutCurrentUser: MutationResolvers<Context>['logout'] = (_root, _args, context) => {
  return context.logout()
}

export const login: MutationResolvers<Context>['login'] = async (_root, { email, password }, context) => {
  const { user } = await context.authenticate('graphql-local', { email, password })
  if (user) {
    await context.login(user)
    return user
  } else {
    return null
  }
}

export const signup: MutationResolvers<Context>['signup'] = async (_root, { name, email, password }, context) => {
  // TODO: Move most of this to AuthService
  const existingUser = await context.prisma.user.findFirst({
    where: {
      email
    }
  })
  const userWithEmailAlreadyExists = existingUser !== null
  if (userWithEmailAlreadyExists) {
    throw new Error(`User with email ${email} already exists`)
  }

  // Hash password before saving in database
  // We use salted hashing to prevent rainbow table attacks
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)

  return await context.prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })
}
