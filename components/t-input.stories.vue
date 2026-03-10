<script setup lang="ts">
// @ts-expect-error: not yet compatible with 'bundler' module resolution
import { TInput } from '@variantjs/vue'
</script>

<template>
  <Stories
    title="t-input"
    :component="TInput"
  >
    <Story title="Default">
      <t-input value="Input text" />
    </Story>
    <Story title="Error">
      <t-input
        value="Input text"
        variant="error"
      />
    </Story>
    <Story title="Success">
      <t-input
        value="Input text"
        variant="success"
      />
    </Story>
    <Story title="Plain">
      <t-input
        value="Input text"
        variant="plain"
      />
    </Story>
  </Stories>
</template>
