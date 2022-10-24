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
        <template #arrow="{ className }">
          <FontAwesomeIcon
            icon="chevron-down"
            size="xs"
            :class="className"
          />
        </template>
      </t-select>
    </div>
    <div class="z-10 grid -mt-2">
      <!-- Auto-grow textarea, taken from https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/ -->
      <div
        class="whitespace-pre-wrap text-xl row-span-1 col-span-1 col-start-1 row-start-1 py-2 px-3 invisible"
      >
        {{ title + ' ' }}
      </div>
      <t-textarea
        v-model="title"
        variant="plain"
        class="text-xl resize-none overflow-hidden row-span-1 col-span-1 col-start-1 row-start-1"
      ></t-textarea>
    </div>
    <div class="-mt-3">
      <Tags
        v-model="authors"
        placeholder="Add author"
        :delimiters="undefined"
        :whitelist="authorSuggestions"
      />
    </div>
    <div>
      <document-editor-input v-model="published"></document-editor-input>
      <span class="text-gray-400">|</span>
      <document-editor-input v-model="journal"></document-editor-input>
    </div>
    <div class="-mt-1">
      <span class="pl-3">
        Volume:
        <document-editor-input v-model="volume"></document-editor-input>
      </span>
      <span class="text-gray-400 pr-3">|</span>
      <span>
        Issue:
        <document-editor-input v-model="issue"></document-editor-input>
      </span>
      <span class="text-gray-400 pr-3">|</span>
      <span>
        pp.
        <document-editor-input v-model="pages"></document-editor-input>
      </span>
    </div>
    <div>
      <document-editor-header
        heading="Abstract"
        class="mt-4 -mb-1"
      ></document-editor-header>
      <t-textarea
        v-model="abstract"
        variant="plain"
        rows="5"
      ></t-textarea>
    </div>
    <div>
      <document-editor-header
        heading="Keywords"
        class="mt-4"
      ></document-editor-header>
      <Tags
        v-model="keywords"
        placeholder="Add keyword"
        :delimiters="undefined"
        :whitelist="keywordSuggestions"
        tag-class="border rounded-md"
      />
    </div>
    <div>
      <document-editor-header
        heading="Groups"
        class="mt-4"
      ></document-editor-header>
      <Tags
        v-model="groups"
        placeholder="Add group"
        :delimiters="undefined"
        :whitelist="groupSuggestions"
        tag-class="bg-primary-50 rounded-md"
      />
    </div>
    <div>
      <document-editor-header
        heading="External"
        class="mt-4 mb-1"
      ></document-editor-header>
      <t-table
        :data="externalLinks"
        variant="plain"
        class="text-sm"
      ></t-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { gql, useFragment } from '~/apollo'
import { PersonFullDetailsFragment } from '~/apollo/graphql'
import Tags from './tagify.vue'

const PersonFullDetails = gql(/* GraphQL */ `
  fragment PersonFullDetails on Person {
    id
    family
    given
    suffix
    nonDroppingParticle
    droppingParticle
  }
`)

const DocumentDetails = gql(/* GraphQL */ `
  fragment DocumentDetails on Document {
    id
    title
    keywords
    abstract
    doi
    authors {
      ... on Person {
        ...PersonFullDetails
      }
      ... on Organization {
        id
        name
      }
    }
    ... on JournalArticle {
      in {
        id
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
        id
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

const props = defineProps({
  documentId: {
    type: String,
    required: true,
  },
})

const { result } = useQuery(
  gql(/* GraphQL */ `
    query DocumentDetails($documentId: ID!) {
      userDocument(id: $documentId) {
        ...DocumentDetails
      }
    }
  `),
  () => ({
    documentId: props.documentId,
  })
)
const document = computed(() =>
  useFragment(DocumentDetails, result.value?.userDocument)
)

function formatAuthor(author: PersonFullDetailsFragment) {
  let result = ''
  if (author.nonDroppingParticle) {
    result += author.nonDroppingParticle + ' '
  }
  result += author.family
  if (author.suffix) {
    result += ' ' + author.suffix
  }
  if (author.given) {
    result += ', ' + author.given
  }
  return result
}
const authors = computed({
  get: () =>
    document.value?.authors.map((author) => ({
      value:
        author.__typename === 'Organization'
          ? author.name
          : author.__typename === 'Person'
          ? formatAuthor(useFragment(PersonFullDetails, author))
          : '',
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

const externalLinks = computed(() => [
  { name: 'DOI', value: document.value?.doi },
  { name: 'ArXiv', value: '1812.04695' },
  { name: 'MathSciNet', value: 'MR3997558' },
])

const title = computed({
  get: () => document.value?.title,
  set: (value) => {
    // TODO: implement
  },
})
const published = computed({
  get: () =>
    document.value && 'published' in document.value
      ? document.value.published
      : null,
  set: (value) => {
    // TODO: implement
  },
})
const journal = computed({
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
})
const volume = computed({
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
})
const issue = computed({
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
})
const pages = computed({
  get: () =>
    document.value && 'pageStart' in document.value
      ? (document.value.pageStart ?? '') +
        (document.value.pageEnd ? '-' + document.value.pageEnd : '')
      : null,
  set: (value) => {
    // TODO: implement
  },
})
const abstract = computed({
  get: () =>
    document.value && 'abstract' in document.value
      ? document.value.abstract
      : null,
  set: (value) => {
    // TODO: implement
  },
})
</script>
