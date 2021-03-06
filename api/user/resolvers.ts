import { UserResolvers, QueryResolvers } from '../graphql'
import prisma from '../prismaClient'

export const userResolver: UserResolvers = {
  id: ({ id }) => id,
  name: ({ name }) => name
}

export const queryUserByID: QueryResolvers['user'] = async (_root, args, _context) => {
  const user = await prisma.user.findUnique({
    where: {
      id: args.id
    }
  })
  return user
}
