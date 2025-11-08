<script setup lang="ts">
// @ts-expect-error: not yet compatible with 'bundler' module resolution
import { TCheckbox } from '@variantjs/vue'
</script>

<template>
  <Stories
    title="t-checkbox"
    :component="TCheckbox"
  >
    <Story title="Default">
      <t-checkbox :checked="true" />
    </Story>
    <Story title="Error">
      <t-checkbox
        :checked="true"
        variant="error"
      />
    </Story>
    <Story title="Success">
      <t-checkbox
        :checked="true"
        variant="success"
      />
    </Story>
    <Story title="Plain">
      <t-checkbox
        :checked="true"
        variant="plain"
      />
    </Story>
  </Stories>
</template>
