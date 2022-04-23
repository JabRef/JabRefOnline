import { ApolloClient, NormalizedCache } from '@apollo/client/core'
import { gql } from '~/apollo'

/**
 * Plugin that adds checks if the user is logged in, and redirects her to the login page if not.
 */
export default defineNuxtRouteMiddleware(async (to, _from) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- There is no type info for meta
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // TODO: Special type treatment should no longer be necessary with vue-apollo v4
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const apolloClient = useNuxtApp().apolloProvider
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        response.data?.me?.id === undefined ||
        response.errors !== undefined
      ) {
        return redirectToLogin()
      }
    } catch (error) {
      return redirectToLogin()
    }
  }
})

async function redirectToLogin(): Promise<void> {
  // TODO: Remember the intended url by appending something like ?redirect=context.route.fullPath
  await navigateTo({ path: '/user/login' })
}
