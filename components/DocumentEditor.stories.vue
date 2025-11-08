<script setup lang="ts">
import DocumentEditor from './DocumentEditor.vue'
</script>

<template>
  <Stories
    title="DocumentEditor"
    :component="DocumentEditor"
  >
    <Story title="Default">
      <div class="h-screen p-4">
        <p class="text-gray-500 mb-4">
          Note: DocumentEditor requires a valid document ID and GraphQL connection.
          This is a placeholder story for documentation purposes.
        </p>
        <div class="border border-gray-300 rounded p-4 bg-gray-50">
          <p class="text-sm text-gray-600">
            Component requires: documentId prop (string)
          </p>
          <p class="text-sm text-gray-600 mt-2">
            Features: Document type selector, title editing, author tags, publication details,
            abstract, keywords, groups, and external links table.
          </p>
        </div>
      </div>
    </Story>
  </Stories>
</template>
