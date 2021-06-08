// @ts-ignore: No type information available yet https://github.com/waitandseeagency/graphql-type-datetime/issues/5
import GraphQLDateTime from 'graphql-type-datetime'
import { mergeResolvers } from '@graphql-tools/merge'
import { Resolvers } from './graphql'
import { resolvers as userResolvers } from './user/resolvers'
import { resolvers as documentResolvers } from './documents/resolvers'
import { resolvers as groupResolvers } from './groups/resolvers'

export function loadResolvers(): Resolvers {
  return mergeResolvers([
    userResolvers(),
    documentResolvers(),
    groupResolvers(),
    {
      // Custom scalar types
      DateTime: GraphQLDateTime,
    },
  ])
}
