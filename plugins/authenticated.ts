import { ApolloClient, NormalizedCache } from '@apollo/client/core'
import { Plugin } from '@nuxt/types'
import { NavigationGuardNext } from 'vue-router'
import { gql } from '~/apollo'

/**
 * Plugin that adds checks if the user is logged in, and redirects her to the login page if not.
 */
export default <Plugin>function ({ app }, _inject) {
  app.router?.beforeEach(async (to, _from, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- There is no type info for meta
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // TODO: Special type treatment should no longer be necessary with vue-apollo v4
      const apolloClient = app.apolloProvider
        ?.defaultClient as ApolloClient<NormalizedCache>

      try {
        // TODO: Only call this if we have a session cookie?
        const response = await apolloClient.query({
          query: gql(/* GraphQL */ `
            query CheckLoggedIn {
              me {
                id
              }
            }
          `),
        })

        // If the user is not authenticated, then redirect
        if (
          response.data?.me?.id === undefined ||
          response.errors !== undefined
        ) {
          redirectToLogin(next)
          return
        }
      } catch (error) {
        redirectToLogin(next)
        return
      }
    }
    next()
  })
}

function redirectToLogin(next: NavigationGuardNext) {
  // TODO: Remember the intended url by appending something like ?redirect=context.route.fullPath
  next({ path: '/user/login' })
}
