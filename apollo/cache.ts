import { InMemoryCache, makeVar } from '@apollo/client/core'
import { relayStylePagination } from '@apollo/client/utilities'
import { User } from '~/api/graphql'
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

/**
 * The currently logged-in user, or null if not logged in.
 */
export const currentUserVar = makeVar<Pick<User, 'id'> | null>(null)
