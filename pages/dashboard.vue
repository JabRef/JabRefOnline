<template>
  <div>
    <div v-if="documents" ref="scrollComponent" class="space-y-4 p-4">
      <DocumentView
        v-for="document of documents"
        :key="document.id"
        :document="document"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery, useResult } from '@vue/apollo-composable'
import { defineComponent, onMounted, onUnmounted } from '@vue/composition-api'
import { gql } from '~/apollo'
import { useUiStore } from '~/store'

const FIRST = 6

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
        cursor: '',
      })
    )

    const documents = useResult(result, null, (data) =>
      data?.me?.documents.edges.map((edge) => edge.node)
    )

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMoreDocuments()
      }
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
          cursor: result.value?.me?.documents.pageInfo.nextCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult?.me?.documents.edges
          const nextCursor = fetchMoreResult?.me?.documents.pageInfo.nextCursor
          return newEdges?.length && previousResult.me?.documents.edges.length
            ? {
                ...previousResult,
                me: {
                  ...previousResult.me,
                  documents: {
                    edges: [...previousResult.me?.documents.edges, ...newEdges],
                    pageInfo: {
                      nextCursor,
                    },
                  },
                },
              }
            : previousResult
        },
      })
    }

    return {
      documents,
    }
  },
})
</script>
