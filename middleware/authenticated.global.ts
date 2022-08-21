import { gql } from '@apollo/client/core'

/**
 * Plugin that adds checks if the user is logged in, and redirects her to the login page if not.
 */
export default defineNuxtRouteMiddleware(async (to, _from) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const { $apolloClient } = useNuxtApp()
    try {
      // TODO: Only call this if we have a session cookie?
      const response = await $apolloClient.query({
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

async function redirectToLogin() {
  // TODO: Remember the intended url by appending something like ?redirect=context.route.fullPath
  return navigateTo({ path: '/user/login' })
}
