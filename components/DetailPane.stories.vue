<script setup lang="ts">
import { useUiStore } from '../store'
import DetailPane from './DetailPane.vue'

const uiStore = useUiStore()
uiStore.isDetailsOpen = true
uiStore.selectedDocumentId = 'mock-document-id'
</script>

<template>
  <Stories
    title="DetailPane"
    :component="DetailPane"
  >
    <Story title="Open with Custom Content">
      <DetailPane>
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-4">Custom Content</h2>
          <p>This is custom content displayed in the detail pane.</p>
          <p class="mt-2 text-sm text-gray-500">
            The detail pane slides in from the right when opened.
          </p>
        </div>
      </DetailPane>
    </Story>
  </Stories>
</template>
