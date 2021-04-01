import { InMemoryCache, makeVar } from '@apollo/client/core'
import { User } from '~/api/graphql'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        currentUser: {
          read() {
            return currentUserVar()
          },
        },
      },
    },
  },
})

/**
 * The currently logged-in user, or null if not logged in.
 */
export const currentUserVar = makeVar<Pick<User, 'id'> | null>(null)
