<script setup lang="ts">
// @ts-expect-error: not yet compatible with 'bundler' module resolution
import { TTag } from '@variantjs/vue'
</script>

<template>
  <Stories
    title="t-tag"
    :component="TTag"
  >
    <Story title="Default">
      <t-tag variant="badge"> Hi there! </t-tag>
    </Story>
  </Stories>
</template>
