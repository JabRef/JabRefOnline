import { UserResolvers, QueryResolvers } from '../graphql'
import { Context } from '../context'

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
}
