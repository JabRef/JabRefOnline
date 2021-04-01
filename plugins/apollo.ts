import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient, HttpLink } from '@apollo/client/core'
import { Plugin } from '@nuxt/types'
import fetch from 'cross-fetch'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { provide, onGlobalSetup } from '@nuxtjs/composition-api'
import { cache } from '../apollo/cache'

Vue.use(VueApollo)

// Create the apollo client
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

  onGlobalSetup(() => {
    provide(DefaultApolloClient, apolloProvider.defaultClient)
  })
}

export default apolloPlugin
