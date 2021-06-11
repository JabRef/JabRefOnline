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

      <a
        class="text-sm whitespace-nowrap mt-1"
        href="/paper/3104609148/citedby"
      >
        2 citations
      </a>
    </div>
    <div class="space-x-1">
      <a href="author/2549788765/publication?paperId=3104609148">Tobias Diez</a>
      <a href="author/2488101096/publication?paperId=3104609148"
        >Gerd Rudolph</a
      >
    </div>
    <div class="space-x-1 text-sm">
      <span class="font-semibold">2019</span>
      <a
        v-if="'journal' in document && document.journal"
        href="journal/158241587"
        >{{ document.journal.name }}</a
      >
    </div>
    <div class="flex flex-row space-x-2 text-sm">
      <t-tag variant="badge" class="border border-gray-400">
        Diffeomorphism constraint
      </t-tag>
      <t-tag variant="badge" class="border border-gray-400">
        Gauge symmetry
      </t-tag>
      <t-tag variant="badge" class="border border-gray-400">
        <FontAwesomeIcon icon="dragon" size="xs" class="mr-2" />
        Dragons
      </t-tag>

      <t-button variant="linkplain" class="text-sm my-auto">
        <span>View More (8+)</span>
        <FontAwesomeIcon icon="chevron-down" size="xs" />
      </t-button>
    </div>
    <div v-if="document.abstract">
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
import { Article, Document, DocumentType } from '../apollo/graphql'
import { useUiStore } from '~/store'
export default defineComponent({
  props: {
    document: {
      type: Object as PropType<Document | Article>,
      required: true,
    },
  },
  setup(props) {
    const { document } = toRefs(props)
    const viewFullAbstract = ref(false)

    const typeIcon = computed(() => {
      switch (document.value.type) {
        case DocumentType.Article:
          return 'newspaper'
      }
    })

    const typeDescription = computed(() => {
      switch (document.value.type) {
        case DocumentType.Article:
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
