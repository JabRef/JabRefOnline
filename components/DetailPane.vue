<template>
  <div>
    <transition
      enter-active-class="transform transition ease-out duration-300"
      leave-active-class="transform transition ease-in duration-300"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isDetailsOpen"
        id="details"
        class="fixed top-20 bottom-0 right-0 flex flex-col flex-wrap bg-white border-l border-gray-300 z-40 w-1/3 md:shadow-sm p-4"
      >
        <div
          class="absolute top-10 -left-3.5 w-7 h-7 rounded-full bg-white border border-gray-300 md:shadow-sm flex items-center justify-center active:border-gray-300 transform text-gray-400 hover:scale-110 hover:border-gray-400 hover:text-gray-500"
        >
          <n-button
            quaternary
            circle
            @click="closePane"
          >
            <Icon name="ri:close-fill" />
          </n-button>
        </div>
        <slot>
          <document-editor
            v-if="selectedDocumentId"
            :document-id="selectedDocumentId"
          />
        </slot>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
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
