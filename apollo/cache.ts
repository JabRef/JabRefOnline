import { type ApolloCache, InMemoryCache } from '@apollo/client/core'
import { relayStylePagination } from '@apollo/client/utilities'
import introspection from '~/apollo/introspection'
import { gql } from '.'
import type { MeQuery } from './graphql'

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
  cache: ApolloCache,
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
