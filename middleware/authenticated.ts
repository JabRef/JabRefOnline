import { Context, Middleware } from '@nuxt/types'
import { gql } from 'graphql-tag'

/**
 * Middleware that checks the user is logged in, and redirects her to the login page if not.
 */
const authenticated: Middleware = async function (context) {
  const apolloClient = context.app.apolloProvider?.defaultClient

  try {
    // TODO: Only call this if we have a session cookie?
    const response = await apolloClient.query({
      query: gql`
        query currentUser {
          currentUser {
            id
          }
        }
      `,
    })

    // If the user is not authenticated, then redirect
    if (!response.data?.currentUser?.id || response.errors) {
      redirectToLogin(context)
    }
  } catch (error) {
    redirectToLogin(context)
  }
}

function redirectToLogin(context: Context) {
  // TODO: Remember the intended url by appending something like ?redirect=context.route.fullPath
  context.redirect(302, '/user/login')
}

export default authenticated
