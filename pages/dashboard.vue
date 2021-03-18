<template>
  <div>
    {{ user }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import gql from 'graphql-tag'

export default Vue.extend({
  middleware: ['authenticated'],
  apollo: {
    user: {
      query: gql`
        query currentUser {
          currentUser {
            id
            email
          }
        }
      `,
      update: (response) => response.currentUser,
    },
  },
})
</script>
