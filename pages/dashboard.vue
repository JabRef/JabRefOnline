<template>
  <div>
    <div v-if="documents" class="space-y-4 p-4">
      <DocumentView
        v-for="document of documents"
        :key="document.id"
        :document="document"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useResult, useQuery } from '@vue/apollo-composable'
import { gql } from '~/apollo'
import { useUiStore } from '~/store'

const FIRST = 10

export default defineComponent({
  middleware: ['authenticated'],

  setup() {
    const ui = useUiStore()

    const { result } = useQuery(
      gql(/* GraphQL */ `
        query GetDocuments(
          $groupId: ID
          $query: String
          $first: Int
          $cursor: String
        ) {
          me {
            id
            documents(
              filterBy: { groupId: $groupId, query: $query }
              first: $first
              cursor: $cursor
            ) {
              edges {
                node {
                  ...DocumentForView
                }
              }
              pageInfo {
                nextCursor
              }
            }
          }
        }
      `),
      () => ({
        groupId: ui.selectedGroupId,
        query: ui.activeSearchQuery,
        first: FIRST,
      })
    )
    const documents = useResult(result, null, (data) => data?.me?.documents)
    return {
      documents,
    }
  },
})
</script>
