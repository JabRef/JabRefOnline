// @ts-ignore: No type information available yet https://github.com/waitandseeagency/graphql-type-datetime/issues/5
import GraphQLDateTime from 'graphql-type-datetime'
import { container } from 'tsyringe'
import { Resolvers } from './graphql'
import { Resolvers as UserResolvers } from './user/resolvers'
import { DocumentResolvers } from './documents/resolvers'

const userResolvers = container.resolve(UserResolvers)
const documentResolvers = container.resolve(DocumentResolvers)

const resolvers: Resolvers = {
  Query: {
    ...userResolvers.queryResolvers(),
    ...documentResolvers.queryResolvers(),
  },

  Mutation: {
    ...userResolvers.mutationResolvers(),
    ...documentResolvers.mutationResolvers(),
  },

  // Custom scalar types
  DateTime: GraphQLDateTime,

  // Our types
  User: userResolvers.userResolver(),
}

export default resolvers
