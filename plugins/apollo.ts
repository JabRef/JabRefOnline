import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'
import { Plugin } from '@nuxt/types'

import fetch from 'cross-fetch'

Vue.use(VueApollo)

// Create the apollo client
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  cache,
  link: new HttpLink({ uri: 'http://localhost:3000/api', fetch }),
  // Send cookies along with every request (needed for authentication)
  credentials: 'include',
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

const apolloPlugin: Plugin = function ({ app }, _inject) {
  app.apolloProvider = apolloProvider
}

export default apolloPlugin
