// @ts-ignore: No type information available yet https://github.com/waitandseeagency/graphql-type-datetime/issues/5
import GraphQLDateTime from 'graphql-type-datetime'
import { container } from 'tsyringe'
import { mergeResolvers } from '@graphql-tools/merge'
import { Resolvers } from './graphql'
import { resolvers as userResolvers } from './user/resolvers'
import { resolvers as documentResolvers } from './documents/resolvers'
import { Resolvers as GroupResolvers } from './groups/resolvers'

const groupResolvers = container.resolve(GroupResolvers)

export function loadResolvers(): Resolvers {
  return mergeResolvers([
    userResolvers(),
    documentResolvers(),
    groupResolvers.resolvers(),
    {
      // Custom scalar types
      DateTime: GraphQLDateTime,
    },
  ])
}
