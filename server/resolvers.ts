import { Resolvers } from '#graphql/resolver'
import { mergeResolvers } from '@graphql-tools/merge'
import {
  BigIntResolver,
  DateTimeResolver,
  EmailAddressResolver,
} from 'graphql-scalars'
import { resolvers as documentResolvers } from './documents/resolvers'
import { resolvers as groupResolvers } from './groups/resolvers'
import { resolvers as journalResolvers } from './journals/resolvers'
import { resolvers as userResolvers } from './user/resolvers'

export function loadResolvers(): Resolvers {
  return mergeResolvers([
    userResolvers(),
    documentResolvers(),
    groupResolvers(),
    journalResolvers(),
    {
      // Custom scalar types
      DateTime: DateTimeResolver,
      EmailAddress: EmailAddressResolver,
      BigInt: BigIntResolver,
    },
  ])
}
