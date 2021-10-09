import { InMemoryCache, makeVar } from '@apollo/client/core'
import { User, Document } from '~/api/graphql'
import introspection from '~/apollo/introspection'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        me: {
          read() {
            return currentUserVar()
          },
        },
      },
    },
    documents: {
      fields: {
        edges: {
          merge(existing: Array<Document> = [], incoming: Array<Document>) {
            return [...existing, ...incoming]
          },
        },
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
