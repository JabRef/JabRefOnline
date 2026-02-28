<script setup lang="ts">
import DocumentEditor from './DocumentEditor.vue'
</script>

<template>
  <Stories
    title="DocumentEditor"
    :component="DocumentEditor"
  >
    <Story title="Default">
      <DocumentEditor document-id="mock-document-id" />
    </Story>
  </Stories>
</template>
