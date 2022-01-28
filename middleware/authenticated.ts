import { useQuery } from '@vue/apollo-composable'
import { gql } from 'apollo'

/**
 * Middleware that adds checks if the user is logged in, and redirects her to the login page if not.
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    // TODO: Only call this if we have a session cookie?
    const response = useQuery(
      gql(/* GraphQL */ `
        query CheckLoggedIn {
          me {
            id
          }
        }
      `)
    )

    // If the user is not authenticated, then redirect
    if (
      response.result.value?.me?.id === undefined ||
      response.error !== undefined
    ) {
      // TODO: Remember the intended url by appending something like ?redirect=context.route.fullPath
      return navigateTo('/user/login')
    }
  } catch (error) {
    return abortNavigation(error)
  }
})
