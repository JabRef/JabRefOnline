import { Resolvers } from './graphql'
import { userResolver, queryResolvers, mutationResolvers } from './user/resolvers'

const resolvers: Resolvers = {
  Query: {
    ...queryResolvers
  },

  Mutation: {
    ...mutationResolvers,
  },

  User: userResolver
}

export default resolvers
