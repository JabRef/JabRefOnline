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
          md:shadow-lg
          p-4
        "
      >
        <button @click="closePane">
          <FontAwesomeIcon icon="times" />
        </button>
        <slot>Test</slot>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { useUiStore } from './../store'

export default defineComponent({
  setup() {
    const ui = useUiStore()
    return {
      isDetailsOpen: computed(() => ui.isDetailsOpen),
      closePane: () => (ui.isDetailsOpen = false),
    }
  },
})
</script>
