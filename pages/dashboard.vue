<template>
  <div>
    <div class="space-y-4 p-4">
      <EntryView />
      <EntryView />
      <EntryView />
      <EntryView />
    </div>
    <div>
      {{ user }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { gql } from 'graphql-tag'

export default Vue.extend({
  middleware: ['authenticated'],
  apollo: {
    user: {
      query: gql`
        query getCurrentUser {
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
