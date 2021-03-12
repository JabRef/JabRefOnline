import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'

import fetch from 'cross-fetch'

Vue.use(VueApollo)

// Create the apollo client
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  cache,
  link: new HttpLink({ uri: 'http://localhost:3000/api', fetch }),
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

const apolloPlugin = function ({ app }, _inject) {
  app.apolloProvider = apolloProvider
}
export default apolloPlugin
