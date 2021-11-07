<template>
  <div class="flex flex-col overflow-y-auto pr-3">
    <div>
      <t-select
        :options="{
          Article: 'Journal Article',
          PhDThesis: 'PhD Thesis',
        }"
        variant="plaincaps"
      >
        <template slot="arrow" slot-scope="{ className }">
          <FontAwesomeIcon icon="chevron-down" size="xs" :class="className" />
        </template>
      </t-select>
    </div>
    <div class="z-10 grid -mt-2">
      <!-- Auto-grow textarea, taken from https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/ -->
      <div
        class="
          whitespace-pre-wrap
          text-xl
          row-span-1
          col-span-1 col-start-1
          row-start-1
          py-2
          px-3
          invisible
        "
      >
        {{ title + ' ' }}
      </div>
      <t-textarea
        v-model="title"
        variant="plain"
        class="
          text-xl
          resize-none
          overflow-hidden
          row-span-1
          col-span-1 col-start-1
          row-start-1
        "
      ></t-textarea>
    </div>
    <div class="-mt-3">
      <Tags
        v-model="authors"
        placeholder="Add author"
        :delimiters="null"
        :whitelist="authorSuggestions"
      />
    </div>
    <div>
      <editor-input v-model="published"></editor-input>
      <span class="text-gray-400">|</span>
      <editor-input v-model="journal"></editor-input>
    </div>
    <div class="-mt-1">
      <span class="pl-3">
        Volume:
        <editor-input v-model="volume"></editor-input>
      </span>
      <span class="text-gray-400 pr-3">|</span>
      <span>
        Issue:
        <editor-input v-model="issue"></editor-input>
      </span>
      <span class="text-gray-400 pr-3">|</span>
      <span>
        pp.
        <editor-input v-model="pages"></editor-input>
      </span>
    </div>
    <div>
      <editor-header heading="Abstract" class="mt-4 -mb-1"></editor-header>
      <t-textarea v-model="abstract" variant="plain" rows="5"></t-textarea>
    </div>
    <div>
      <editor-header heading="Keywords" class="mt-4"></editor-header>
      <Tags
        v-model="keywords"
        placeholder="Add keyword"
        :delimiters="null"
        :whitelist="keywordSuggestions"
        tag-class="border rounded-md"
      />
    </div>
    <div>
      <editor-header heading="Groups" class="mt-4"></editor-header>
      <Tags
        v-model="groups"
        placeholder="Add group"
        :delimiters="null"
        :whitelist="groupSuggestions"
        tag-class="bg-highlight-50 rounded-md"
      />
    </div>
    <div>
      <editor-header heading="External" class="mt-4 mb-1"></editor-header>
      <t-table :data="external" variant="plain" class="text-sm"></t-table>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { useResult, useQuery } from '@vue/apollo-composable'
import Tags from './tagify.vue'
import EditorInput from './EditorInput.vue'
import EditorHeader from './EditorHeader.vue'
import { gql } from '~/apollo'

export const DocumentDetails = gql(/* GraphQL */ `
  fragment DocumentDetails on Document {
    id
    title
    keywords
    abstract
    doi
    authors {
      ... on Person {
        id
        name
      }
      ... on Organization {
        id
        name
      }
    }
    ... on JournalArticle {
      in {
        volume
        number
        journal {
          id
          name
        }
      }
      published
      pageStart
      pageEnd
    }
    ... on ProceedingsArticle {
      in {
        title
      }
    }
    ... on Thesis {
      institution {
        id
        name
      }
    }
  }
`)

export default defineComponent({
  components: {
    Tags,
    EditorInput,
    EditorHeader,
  },
  props: {
    documentId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { result } = useQuery(
      gql(/* GraphQL */ `
        query GetDocumentDetails($documentId: ID!) {
          userDocument(id: $documentId) {
            ...DocumentDetails
          }
        }
      `),
      () => ({
        documentId: props.documentId,
      })
    )
    const document = useResult(result)

    const authors = computed({
      get: () =>
        document.value?.authors.map((author) => ({
          value: author.name,
        })),
      set: (value) => {
        // TODO: implement
      },
    })
    const authorSuggestions = [{ value: 'Linus' }]

    const keywords = computed({
      get: () =>
        document.value?.keywords.map((keyword) => ({
          value: keyword,
        })),
      set: (value) => {
        // TODO: implement
      },
    })
    const keywordSuggestions = [{ value: 'Differential Geometry' }]

    const groups = [{ value: 'Chocolate Making' }, { value: 'Consumption' }]
    const groupSuggestions = [{ value: 'Grinding' }]

    const external = computed(() => [
      { name: 'DOI', value: document.value?.doi },
      { name: 'ArXiv', value: '1812.04695' },
      { name: 'MathSciNet', value: 'MR3997558' },
    ])

    return {
      title: computed({
        get: () => document.value?.title,
        set: (value) => {
          // TODO: implement
        },
      }),
      authors,
      authorSuggestions,
      published: computed({
        get: () =>
          document.value && 'published' in document.value
            ? document.value.published
            : null,
        set: (value) => {
          // TODO: implement
        },
      }),
      journal: computed({
        get: () =>
          document.value &&
          'in' in document.value &&
          document.value.in &&
          'journal' in document.value.in
            ? document.value.in?.journal?.name
            : null,
        set: (value) => {
          // TODO: implement
        },
      }),
      volume: computed({
        get: () =>
          document.value &&
          'in' in document.value &&
          document.value.in &&
          'volume' in document.value.in
            ? document.value.in?.volume
            : null,
        set: (value) => {
          // TODO: implement
        },
      }),
      issue: computed({
        get: () =>
          document.value &&
          'in' in document.value &&
          document.value.in &&
          'number' in document.value.in
            ? document.value.in?.number
            : null,
        set: (value) => {
          // TODO: implement
        },
      }),
      pages: computed({
        get: () =>
          document.value && 'pageStart' in document.value
            ? (document.value.pageStart ?? '') +
              (document.value.pageEnd ? '-' + document.value.pageEnd : '')
            : null,
        set: (value) => {
          // TODO: implement
        },
      }),
      abstract: computed({
        get: () =>
          document.value && 'abstract' in document.value
            ? document.value.abstract
            : null,
        set: (value) => {
          // TODO: implement
        },
      }),
      keywords,
      keywordSuggestions,
      groups,
      groupSuggestions,
      external,
    }
  },
})
</script>
