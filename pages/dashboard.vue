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
// import { defineComponent } from '@nuxtjs/composition-api'
// import { useResult, useQuery } from '@vue/apollo-composable'
// import { gql } from '~/apollo'
// import { useUiStore } from '~/store'

// export default defineComponent({
//   middleware: ['authenticated'],

//   setup() {
//     const ui = useUiStore()

//     const { result } = useQuery(
//       gql(/* GraphQL */ `
//         query GetDocuments($groupId: ID, $query: String) {
//           me {
//             id
//             documents(filterBy: { groupId: $groupId, query: $query }) {
//               ...DocumentForView
//             }
//           }
//         }
//       `),
//       () => ({
//         groupId: ui.selectedGroupId,
//         query: ui.activeSearchQuery,
//       })
//     )
//     const documents = useResult(result, null, (data) => data?.me?.documents)
//     return {
//       documents,
//     }
//   },
// })
//
</script>
