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
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
} from '@nuxtjs/composition-api'
import { useResult, useQuery } from '@vue/apollo-composable'
import { gql } from '~/apollo'
import { useUiStore } from '~/store'

const FIRST = 10

export default defineComponent({
  middleware: ['authenticated'],

  setup() {
    const ui = useUiStore()
    const scrollComponent = ref(null)
    const cursor = ref('')
    const documents = ref([])

    const { result, refetch } = useQuery(
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
    const document = useResult(result, null, (data) =>
      data?.me?.documents?.edges?.map((edge) => edge?.node)
    )
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    const handleScroll = (e) => {
      const element = scrollComponent.value
      if (element.getBoundingClientRect().bottom < window.innerHeight) {
        loadMorePosts()
      }
    }
    documents.value.push(...document)
    return {
      documents,
      scrollComponent,
    }
  },
})
</script>
