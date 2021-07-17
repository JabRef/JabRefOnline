<template>
  <div class="space-y-1">
    <div class="flex flex-row justify-between space-x-10">
      <button
        class="font-semibold text-lg text-primary-800"
        @click="displayDocumentDetails"
      >
        <FontAwesomeIcon
          v-if="typeIcon"
          :icon="typeIcon"
          class="mr-1"
          :title="typeDescription"
        ></FontAwesomeIcon>
        <span>{{ document.title }}</span>
      </button>
      <!-- TOOD: Add citation display
      <a
        class="text-sm whitespace-nowrap mt-1"
        href="/paper/id/citedby"
      >
        2 citations
      </a>
      -->
    </div>
    <div v-if="'authors' in document && document.authors" class="space-x-3">
      <span v-for="author in document.authors" :key="author.id">{{
        author.name
      }}</span>
    </div>
    <div class="space-x-1 text-sm">
      <span class="font-semibold">2019</span>
      <a
        v-if="'journal' in document && document.journal"
        href="journal/TODOid"
        >{{ document.journal.name }}</a
      >
    </div>
    <div
      v-if="document.keywords.length > 0"
      class="flex flex-row space-x-2 text-sm"
    >
      <t-tag
        v-for="keyword in document.keywords"
        :key="keyword"
        variant="badge"
        class="border border-gray-400"
      >
        <!-- TODO: Add icon of group <FontAwesomeIcon icon="dragon" size="xs" class="mr-2" /> -->
        {{ keyword }}
      </t-tag>
      <!-- TODO: Add overflow
      <t-button variant="linkplain" class="text-sm my-auto">
        <span>View More (8+)</span>
        <FontAwesomeIcon icon="chevron-down" size="xs" />
      </t-button>
      -->
    </div>
    <div v-if="'abstract' in document && document.abstract">
      <span class="flex-grow" :class="{ 'line-clamp-2': !viewFullAbstract }">
        {{ document.abstract }}
      </span>
      <t-button
        variant="linkplain"
        class="text-sm my-auto"
        @click="viewFullAbstract = !viewFullAbstract"
      >
        <template v-if="viewFullAbstract">
          <span>View less</span>
          <FontAwesomeIcon icon="chevron-up" size="xs" />
        </template>
        <template v-else>
          <span>View full abstract</span>
          <FontAwesomeIcon icon="chevron-down" size="xs" />
        </template>
      </t-button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  computed,
  toRefs,
} from '@nuxtjs/composition-api'
import { gql } from '@apollo/client/core'
import { DocumentForViewFragment } from '../apollo/graphql'
import { useUiStore } from '~/store'

export const DocumentForView = gql`
  fragment DocumentForView on Document {
    id
    title
    keywords
    ... on Article {
      abstract
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
      journal {
        name
      }
    }
  }
`

export default defineComponent({
  props: {
    document: {
      type: Object as PropType<DocumentForViewFragment>,
      required: true,
    },
  },
  setup(props) {
    const { document } = toRefs(props)
    const viewFullAbstract = ref(false)

    // TODO: Convert the following switches to use `document.value.type`
    const typeIcon = computed(() => {
      switch (document.value.__typename) {
        case 'Article':
          return 'newspaper'
      }
    })

    const typeDescription = computed(() => {
      switch (document.value.__typename) {
        case 'Article':
          return 'Journal Paper'
      }
    })

    const ui = useUiStore()
    function displayDocumentDetails() {
      ui.displayDocumentDetails()
    }

    return {
      typeIcon,
      typeDescription,
      viewFullAbstract,
      displayDocumentDetails,
    }
  },
})
</script>
