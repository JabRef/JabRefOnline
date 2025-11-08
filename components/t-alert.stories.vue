<script setup lang="ts">
// @ts-expect-error: not yet compatible with 'bundler' module resolution
import { TAlert } from '@variantjs/vue'
</script>

<template>
  <Stories
    title="t-alert"
    :component="TAlert"
  >
    <Story title="Default">
      <t-alert :show="true"> Hi there! </t-alert>
    </Story>
    <Story title="Error">
      <t-alert
        :show="true"
        variant="error"
      >
        oops!
      </t-alert>
    </Story>
    <Story title="Success">
      <t-alert
        :show="true"
        variant="success"
      >
        success!
      </t-alert>
    </Story>
  </Stories>
</template>
