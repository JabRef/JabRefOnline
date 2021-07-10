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
import { gql } from '@apollo/client/core'
import { useResult, useQuery } from '@vue/apollo-composable'
import { GetDocumentsDocument } from '~/apollo/graphql'

export default defineComponent({
  middleware: ['authenticated'],

  setup() {
    gql`
      query getDocuments {
        me {
          documents {
            id
            type
            title
            ... on Article {
              abstract
              author {
                ... on Person {
                  name
                }
                ... on Organization {
                  name
                }
              }
              journal {
                name
              }
            }
          }
        }
      }
    `

    const { result } = useQuery(GetDocumentsDocument)
    const documents = useResult(result, null, (data) => data?.me?.documents)
    return {
      documents,
    }
  },
})
</script>
