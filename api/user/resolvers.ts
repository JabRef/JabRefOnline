import { UserResolvers, QueryResolvers } from '../graphql'

export const userResolver: UserResolvers = {
  id: ({ id }) => id,
  name: ({ name }) => name
}

export const queryUserByID: QueryResolvers['user'] = async (_root, args, context) => {
  const userId = Number(args.id)
  return await context.prisma.user.findUnique({
    where: {
      id: userId
    }
  })
}
