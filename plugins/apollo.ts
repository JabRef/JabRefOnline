import { ApolloClient, HttpLink } from '@apollo/client/core'
import fetch from 'cross-fetch'
import { onError } from '@apollo/client/link/error'
import { logErrorMessages } from '@vue/apollo-util'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { cache } from '../apollo/cache'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { Environment } from '~/config'

export default defineNuxtPlugin((nuxtApp) => {
  if (!nuxtApp) {
    // For some strange reason, nuxtApp is not defined for storybook, so don't do anything in this case
    return
  }

  const config = useRuntimeConfig()
  let httpLink
  if (config.public.environment === Environment.LocalDevelopment) {
    httpLink = new HttpLink({ uri: 'http://localhost:3000/api/', fetch })
  } else {
    httpLink = new HttpLink({ uri: 'http://0.0.0.0:8080/api/', fetch })
  }

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
})
