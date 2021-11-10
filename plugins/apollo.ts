import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient, HttpLink } from '@apollo/client/core'
import fetch from 'cross-fetch'
import { onError } from '@apollo/client/link/error'
import { logErrorMessages } from '@vue/apollo-util'
import { provideApolloClient } from '@vue/apollo-composable'
import { cache } from '../apollo/cache'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { Environment } from '~/config'

Vue.use(VueApollo)

const apolloPlugin = defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  let httpLink
  if (config.environment === Environment.Production) {
    httpLink = new HttpLink({ uri: '/api', fetch })
  } else {
    httpLink = new HttpLink({ uri: 'http://localhost:3000/api', fetch })
  }

  // Print errors
  const errorLink = onError((error) => {
    if (config.environment !== Environment.Production) {
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

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
  })

  provideApolloClient(apolloProvider?.defaultClient)
})

export default apolloPlugin
