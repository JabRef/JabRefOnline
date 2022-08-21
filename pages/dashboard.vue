<template>
  <div
    v-if="documents"
    class="space-y-4 p-4 h-full"
  >
    <!-- TODO: Use virtual list as soon as it supports Vue3: https://github.com/tangbc/vue-virtual-scroll-list/issues/253
  
    <virtual-list
      class="virtual-list"
      :page-mode="true"
      @tobottom="onScrollToBottom"
    >
    -->
    <DocumentView
      v-for="document of documents"
      :key="document.id"
      :source="document"
    >
    </DocumentView>
    <!--
        </virtual-list>
      -->
  </div>
</template>

<script lang="ts">
import { WatchQueryFetchPolicy } from '@apollo/client/core'
import { useQuery, useResult } from '@vue/apollo-composable'
import { gql } from '~/apollo'
import { useUiStore } from '~/store'

const FIRST = 4

export default defineComponent({
  meta: {
    // TODO: Reactivate login check
    // requiresAuth: true,
  },

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
        first: ui.activeSearchQuery ? null : FIRST,
        after: '',
      }),
      () => ({
        fetchPolicy: ui.activeSearchQuery
          ? ('no-cache' as WatchQueryFetchPolicy)
          : ('cache-first' as WatchQueryFetchPolicy),
      })
    )

    const documents = useResult(result, null, (data) =>
      data?.me?.documents.edges.map((edge) => edge.node)
    )

    const onScrollToBottom = () => {
      if (result.value?.me?.documents.pageInfo.hasNextPage) {
        void fetchMore({
          variables: {
            groupId: ui.selectedGroupId,
            query: ui.activeSearchQuery,
            first: FIRST,
            after: result.value?.me?.documents.pageInfo.endCursor ?? undefined,
          },
        })
      }
    }

    return {
      documents,
      onScrollToBottom,
    }
  },
})
</script>
