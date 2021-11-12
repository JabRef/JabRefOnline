<template>
  <div>
    <div v-if="documents" class="space-y-4 p-4 h-full">
      <virtual-list
        class="virtual-list"
        :data-key="'id'"
        :page-mode="true"
        :data-sources="documents"
        :data-component="DocumentView"
        @tobottom="onScrollToBottom"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery, useResult } from '@vue/apollo-composable'
import { defineComponent } from '@vue/composition-api'
import virtualList from 'vue-virtual-scroll-list'
import { WatchQueryFetchPolicy } from '@apollo/client/core'
import DocumentView from '../components/DocumentView.vue'
import { gql } from '~/apollo'
import { useUiStore } from '~/store'

const FIRST = 4

export default defineComponent({
  components: {
    'virtual-list': virtualList,
  },
  meta: {
    requiresAuth: true,
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
            after: result.value?.me?.documents.pageInfo.endCursor,
          },
        })
      }
    }

    return {
      documents,
      DocumentView,
      onScrollToBottom,
    }
  },
})
</script>
