import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state() {
    return {
      /**
       * Indicates whether the details pane on the right is currently shown.
       */
      isDetailsOpen: false,

      /**
       * The id of the currently selected document.
       */
      selectedDocumentId: null as string | null,

      /**
       * The id of the currently selected group.
       */
      selectedGroupId: null as string | null,

      /**
       * The currently active search query, or null if no search is in progress.
       */
      activeSearchQuery: null as string | null,
    }
  },
  actions: {
    displayDocumentDetails(documentId: string) {
      this.selectedDocumentId = documentId
      this.isDetailsOpen = true
    },
  },
})
