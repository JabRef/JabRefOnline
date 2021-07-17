import { ApolloClient, NormalizedCache } from '@apollo/client/core'
import { Context, Middleware } from '@nuxt/types'
import { CheckLoggedInDocument, CheckLoggedInQuery } from '~/apollo/graphql'

/**
 * Middleware that checks the user is logged in, and redirects her to the login page if not.
 */
const authenticated: Middleware = async function (context) {
  // TODO: Special type treatment should no longer be necessary with vue-apollo v4
  const apolloClient = context.app.apolloProvider
    ?.defaultClient as ApolloClient<NormalizedCache>

  try {
    // TODO: Only call this if we have a session cookie?
    const response = await apolloClient.query<CheckLoggedInQuery>({
      query: CheckLoggedInDocument,
    })

    // If the user is not authenticated, then redirect
    if (!response.data?.me?.id || response.errors) {
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
