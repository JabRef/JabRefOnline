import { ApolloClient, HttpLink } from '@apollo/client'
import { CombinedGraphQLErrors } from '@apollo/client/errors'
import { ErrorLink } from '@apollo/client/link/error'
import { DefaultApolloClient } from '@vue/apollo-composable'
import fetch from 'cross-fetch'
import { Environment } from '~/config'
import { cache } from '../apollo/cache'

export default defineNuxtPlugin((nuxtApp) => {
  if (!nuxtApp) {
    // For some strange reason, nuxtApp is not defined for storybook, so don't do anything in this case
    return
  }

  const config = useRuntimeConfig()
  const httpLink = new HttpLink({
    uri: '/api',
    fetch,
    // Send cookies along with every request (needed for authentication)
    credentials: 'include',
  })

  // Print errors
  const errorLink = new ErrorLink(({ error }) => {
    if (config.public.environment !== Environment.Production) {
      if (CombinedGraphQLErrors.is(error)) {
        error.errors.forEach(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${JSON.stringify(path)}`,
          )
        })
      } else {
        console.error('[Network error]:', error)
      }
    }
  })

  // Create the apollo client
  const apolloClient = new ApolloClient({
    cache,
    link: errorLink.concat(httpLink),

    // Identification of client awareness: https://www.apollographql.com/docs/react/api/link/apollo-link-client-awareness
    clientAwareness: {
      name: 'web',
    },
  })

  // provideApolloClient(apolloClient)
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
  return {
    provide: {
      apolloClient,
    },
  }
})
