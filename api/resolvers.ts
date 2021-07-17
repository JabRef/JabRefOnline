import { mergeResolvers } from '@graphql-tools/merge'
import { DateTimeResolver, EmailAddressResolver } from 'graphql-scalars'
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
      DateTime: DateTimeResolver,
      EmailAddress: EmailAddressResolver,
    },
  ])
}
