import { InMemoryCache } from '@apollo/client/core'
import { relayStylePagination } from '@apollo/client/utilities'
import { MeQuery } from './graphql'
import { gql } from '.'
import introspection from '~/apollo/introspection'

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

export function cacheCurrentUser(user: MeQuery['me'] | null): void {
  cache.writeQuery({
    query: gql(/* GraphQL */ `
      query Me {
        me {
          id
        }
      }
    `),
    data: { me: user },
  })
}
