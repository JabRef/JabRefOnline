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
import { useResult, useQuery } from '@vue/apollo-composable'
import {
  ref,
  defineComponent,
  onMounted,
  onUnmounted,
} from '@vue/composition-api'
import { gql } from '~/apollo'
import { useUiStore } from '~/store'

const FIRST = 5

export default defineComponent({
  middleware: ['authenticated'],

  setup() {
    const ui = useUiStore()
    const cursor = ref<string>('')
    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    const documents = ref(Array())

    const { result, refetch, onResult } = useQuery(
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
        cursor: cursor.value,
      })
    )

    onResult((data) => {
      const documentResult = data.data.me?.documents.edges.map(
        (edge) => edge.node
      )
      if (documentResult !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        documents.value = [...documents.value, ...documentResult]
      }
    })
    const newCursor = useResult(
      result,
      null,
      (data) => data?.me?.documents.pageInfo.nextCursor
    )
    cursor.value = newCursor.value ? newCursor.value : ''

    const handleScroll = async () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        await loadMoreDocuments()
      }
    }

    onMounted(() => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      window.removeEventListener('scroll', handleScroll)
    })

    const loadMoreDocuments = async () => {
      const documentResult = await refetch({
        groupId: ui.selectedGroupId,
        query: ui.activeSearchQuery,
        cursor: cursor.value,
        first: FIRST,
      })

      cursor.value =
        documentResult?.data.me?.documents.pageInfo.nextCursor || ''

      const newDocuments = documentResult?.data.me?.documents.edges
        ?.filter((edge) => edge?.node)
        .map((edge) => edge?.node)

      if (newDocuments) {
        documents.value.push(...newDocuments)
      }
    }

    return {
      documents,
    }
  },
})
</script>
