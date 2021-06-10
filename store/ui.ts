import { defineStore } from 'pinia'

export const useUiStore = defineStore({
  id: 'ui',
  state() {
    return {
      /**
       * Indicates whether the details pane on the right is currently shown.
       */
      isDetailsOpen: false,
    }
  },
  actions: {
    displayDocumentDetails() {
      this.isDetailsOpen = true
    },
  },
})
