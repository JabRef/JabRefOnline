<script setup lang="ts">
import DocumentEditorHeader from './DocumentEditorHeader.vue'
</script>

<template>
  <Stories
    title="DocumentEditorHeader"
    :component="DocumentEditorHeader"
  >
    <Story title="Default">
      <DocumentEditorHeader heading="Document Title" />
    </Story>
    <Story title="Different Sections">
      <div class="space-y-4">
        <DocumentEditorHeader heading="Required Fields" />
        <DocumentEditorHeader heading="Optional Fields" />
        <DocumentEditorHeader heading="General" />
      </div>
    </Story>
  </Stories>
</template>
