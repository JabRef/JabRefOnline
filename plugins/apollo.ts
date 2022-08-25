import { ApolloClient, HttpLink } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { logErrorMessages } from '@vue/apollo-util'
import fetch from 'cross-fetch'
import { Environment } from '~/config'
import { cache } from '../apollo/cache'

export default defineNuxtPlugin((nuxtApp) => {
  if (!nuxtApp) {
    // For some strange reason, nuxtApp is not defined for storybook, so don't do anything in this case
    return
  }

  const config = useRuntimeConfig()
  const httpLink = new HttpLink({ uri: '/api', fetch })

  // Print errors
  const errorLink = onError((error) => {
    if (config.public.environment !== Environment.Production) {
      logErrorMessages(error)
    }
  })

  // Create the apollo client
  const apolloClient = new ApolloClient({
    cache,
    link: errorLink.concat(httpLink),
    // Send cookies along with every request (needed for authentication)
    credentials: 'include',
  })

  // provideApolloClient(apolloClient)
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
  return {
    provide: {
      apolloClient,
    },
  }
})
