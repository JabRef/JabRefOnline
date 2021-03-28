// @ts-ignore: No type information available yet https://github.com/waitandseeagency/graphql-type-datetime/issues/5
import GraphQLDateTime from 'graphql-type-datetime'
import { container } from 'tsyringe'
import { Resolvers } from './graphql'
import {
  userResolver,
  queryResolvers as userQueryResolvers,
  mutationResolvers as userMutationResolvers,
} from './user/resolvers'
import { DocumentResolvers } from './documents/resolvers'

const documentResolvers = container.resolve(DocumentResolvers)

const resolvers: Resolvers = {
  Query: {
    ...userQueryResolvers,
    ...documentResolvers.queryResolvers(),
  },

  Mutation: {
    ...userMutationResolvers,
    ...documentResolvers.mutationResolvers(),
  },

  // Custom scalar types
  DateTime: GraphQLDateTime,

  // Our types
  User: userResolver,
}

export default resolvers
