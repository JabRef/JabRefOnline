import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient} from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from '@apollo/client/core';
import fetch from 'cross-fetch'

Vue.use(VueApollo)

// Create the apollo client
const cache = new InMemoryCache(); 
const apolloClient = new ApolloClient({
  cache: cache,
  link: new HttpLink({ uri: 'http://localhost:3000/api', fetch: fetch })
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
  })

var apolloPlugin = function ({ app }, _inject) {
  app.apolloProvider = apolloProvider
}
export default apolloPlugin
