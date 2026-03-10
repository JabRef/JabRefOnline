<script setup lang="ts">
// @ts-expect-error: not yet compatible with 'bundler' module resolution
import { TTextarea } from '@variantjs/vue'
</script>

<template>
  <Stories
    title="t-textarea"
    :component="TTextarea"
  >
    <Story title="Default">
      <t-textarea value="Input text" />
    </Story>
  </Stories>
</template>
