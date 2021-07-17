<template>
  <div class="container">
    <div>
      <div v-if="authStatus">
        <button class="auth-button">Log Out</button>
      </div>

      <Logo />
      <h1 class="title">nuxt-express</h1>
      <div>
        {{ test }}
        {{ result }}
        <div class="links">
          <a href="/users" class="button--green">Users List</a>
        </div>
      </div>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
      <FontAwesomeIcon icon="laugh-beam" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { gql } from '@apollo/client/core'

export default Vue.extend({
  apollo: {
    user: {
      query: gql`
        query getUserById($id: ID!) {
          user(id: $id) {
            email
          }
        }
      `,
      variables: {
        id: 'cklzr73840000l8v7b4gthdts',
      },
    },
  },
  data() {
    const result = 'test3'
    return {
      authStatus: false,
      result,
      test: 'Walter2',
    }
  },
})
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
