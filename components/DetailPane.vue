<template>
  <div>
    <transition
      enter-active-class="transform transition ease-out duration-300"
      leave-active-class="transform transition ease-in duration-300"
      enter-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isDetailsOpen"
        id="details"
        class="
          fixed
          top-20
          bottom-0
          right-0
          flex flex-col flex-wrap
          bg-white
          border-l border-gray-300
          z-40
          w-1/3
          md:shadow-sm
          p-4
        "
      >
        <t-button
          variant="plain"
          class="
            absolute
            top-10
            -left-3.5
            w-7
            h-7
            rounded-full
            bg-white
            border border-gray-300
            md:shadow-sm
            flex
            items-center
            justify-center
            active:border-gray-300
            transform
            text-gray-400
            hover:scale-110 hover:border-gray-400 hover:text-gray-500
          "
          @click="closePane"
        >
          <FontAwesomeIcon icon="times" />
        </t-button>
        <slot>
          <document-editor :document-id="selectedDocumentId"></document-editor>
        </slot>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useUiStore } from './../store'

export default defineComponent({
  setup() {
    const ui = useUiStore()
    return {
      selectedDocumentId: computed(() => ui.selectedDocumentId),
      isDetailsOpen: computed(() => ui.isDetailsOpen),
      closePane: () => (ui.isDetailsOpen = false),
    }
  },
})
</script>
