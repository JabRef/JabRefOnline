// @ts-ignore: No type information available yet https://github.com/waitandseeagency/graphql-type-datetime/issues/5
import GraphQLDateTime from 'graphql-type-datetime'
import { container } from 'tsyringe'
import _ from 'lodash'
import { Resolvers } from './graphql'
import { resolvers as userResolvers } from './user/resolvers'
import { Resolvers as DocumentResolvers } from './documents/resolvers'
import { Resolvers as GroupResolvers } from './groups/resolvers'

const documentResolvers = container.resolve(DocumentResolvers)
const groupResolvers = container.resolve(GroupResolvers)

const resolvers: Resolvers = _.merge(
  userResolvers(),
  documentResolvers.resolvers(),
  groupResolvers.resolvers(),
  {
    // Custom scalar types
    DateTime: GraphQLDateTime,
  }
)

export default resolvers
