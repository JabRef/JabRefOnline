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

//
<script lang="ts">
import { useQuery, useResult } from '@vue/apollo-composable'
import { defineComponent, onMounted, onUnmounted } from '@vue/composition-api'
import { gql } from '~/apollo'
import { useUiStore } from '~/store'

const FIRST = 4

export default defineComponent({
  middleware: ['authenticated'],

  setup() {
    const ui = useUiStore()

    const { result, fetchMore } = useQuery(
      gql(/* GraphQL */ `
        query GetDocuments(
          $groupId: ID
          $query: String
          $first: Int
          $after: String
        ) {
          me {
            id
            documents(
              filterBy: { groupId: $groupId, query: $query }
              first: $first
              after: $after
            ) {
              edges {
                node {
                  ...DocumentForView
                }
              }
              pageInfo {
                endCursor
                hasNextPage
              }
            }
          }
        }
      `),
      () => ({
        groupId: ui.selectedGroupId,
        query: ui.activeSearchQuery,
        first: FIRST,
        after: '',
      })
    )

    const documents = useResult(result, null, (data) =>
      data?.me?.documents.edges.map((edge) => edge.node)
    )

    const hasNextPage = useResult(
      result,
      null,
      (data) => data?.me?.documents.pageInfo.hasNextPage
    )

    const handleScroll = () => {
      if (
        result.value?.me?.documents.pageInfo.hasNextPage &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      )
        loadMoreDocuments()
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    const loadMoreDocuments = () => {
      void fetchMore({
        variables: {
          groupId: ui.selectedGroupId,
          query: ui.activeSearchQuery,
          first: FIRST,
          after: result.value?.me?.documents.pageInfo.endCursor,
        },
      })
    }

    return {
      documents,
    }
  },
})
</script>
