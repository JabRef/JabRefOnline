import { type ApolloCache, InMemoryCache } from '@apollo/client/core'
import { relayStylePagination } from '@apollo/client/utilities/policies/pagination'
import { gql } from '.'
import type { MeQuery } from './generated/graphql'
import introspection from './generated/introspection'

export const cache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        documents: relayStylePagination(),
      },
    },
  },
  // Specify supertype-subtype relationships, https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
  possibleTypes: introspection.possibleTypes,
})

export function cacheCurrentUser(
  cache: ApolloCache<any>,
  user: MeQuery['me'] | null,
): void {
  cache.writeQuery({
    query: gql(/* GraphQL */ `
      query Me {
        me {
          id
        }
      }
    `),
    data: { __typename: 'Query', me: user },
  })
}
