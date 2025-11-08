<script setup lang="ts">
import { ref } from 'vue'
import DocumentEditorInput from './DocumentEditorInput.vue'

const shortText = ref('Short text')
const longText = ref(
  'This is a much longer text that demonstrates auto-growing behavior',
)
</script>

<template>
  <Stories
    title="DocumentEditorInput"
    :component="DocumentEditorInput"
  >
    <Story title="Empty">
      <DocumentEditorInput />
    </Story>
    <Story title="With Short Text">
      <DocumentEditorInput v-model="shortText" />
    </Story>
    <Story title="With Long Text">
      <DocumentEditorInput v-model="longText" />
    </Story>
  </Stories>
</template>
