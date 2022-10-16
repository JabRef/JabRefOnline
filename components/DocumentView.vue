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
    <div
      v-if="'authors' in document && document.authors"
      class="space-x-3"
    >
      <span
        v-for="author in document.authors"
        :key="author.id"
        >{{ author.name }}</span
      >
    </div>
    <div class="space-x-1 text-sm">
      <span class="font-semibold">2019</span>
      <a
        v-if="
          'in' in document &&
          document.in &&
          'journal' in document.in &&
          document.in.journal
        "
        :href="'journal/' + document.in.journal.id"
        >{{ document.in.journal.name }}</a
      >
      <a
        v-if="'institution' in document && document.institution"
        :href="'institution/' + document.institution.id"
        >{{ document.institution.name }}</a
      >
      <span v-if="'in' in document && document.in && 'title' in document.in">
        {{ document.in.title }}
      </span>
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
      <n-button variant="linkplain" class="text-sm my-auto">
        <span>View More (8+)</span>
        <FontAwesomeIcon icon="chevron-down" size="xs" />
      </n-button>
      -->
    </div>
    <div v-if="'abstract' in document && document.abstract">
      <span
        class="grow"
        :class="{ 'line-clamp-2': !viewFullAbstract }"
      >
        {{ document.abstract }}
      </span>
      <n-button
        text
        class="text-sm my-auto"
        @click="viewFullAbstract = !viewFullAbstract"
      >
        <template v-if="viewFullAbstract">
          <span>View less</span>
          <FontAwesomeIcon
            icon="chevron-up"
            size="xs"
          />
        </template>
        <template v-else>
          <span>View full abstract</span>
          <FontAwesomeIcon
            icon="chevron-down"
            size="xs"
          />
        </template>
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { FragmentType, gql, useFragment } from '~/apollo'
import { useUiStore } from '~/store'

const DocumentForView = gql(/* GraphQL */ `
  fragment DocumentForView on Document {
    id
    title
    keywords
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
    ... on JournalArticle {
      in {
        id
        journal {
          id
          name
        }
      }
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
  source: {
    type: Object as PropType<FragmentType<typeof DocumentForView>>,
    required: true,
  },
})

const document = computed(() => useFragment(DocumentForView, props.source))
const viewFullAbstract = ref(false)

const typeIcon = computed(() => {
  switch (document.value.__typename) {
    case 'JournalArticle':
      return 'newspaper'
    case 'ProceedingsArticle':
      return 'chalkboard-teacher'
    case 'Thesis':
      return 'graduation-cap'
    default:
      return 'file-alt'
  }
})

const typeDescription = computed(() => {
  switch (document.value.__typename) {
    case 'JournalArticle':
      return 'Journal Paper'
    case 'ProceedingsArticle':
      return 'Conference Paper'
    case 'Thesis':
      return 'PhD Thesis'
    default:
      return document.value.__typename
  }
})

const ui = useUiStore()
function displayDocumentDetails() {
  ui.displayDocumentDetails(document.value.id)
}
</script>
