<script setup lang="ts">
// @ts-expect-error: not yet compatible with 'bundler' module resolution
import { TSelect } from '@variantjs/vue'
</script>

<template>
  <Stories
    title="t-select"
    :component="TSelect"
  >
    <Story title="Default">
      <t-select
        :options="['react', 'vue', 'Svelte', 'angular']"
        placeholder="Select a framework"
      />
    </Story>
    <Story title="Plain">
      <t-select
        :options="['react', 'vue', 'Svelte', 'angular']"
        placeholder="Select a framework"
        variant="plain"
      />
    </Story>
    <Story title="Plaincaps">
      <t-select
        :options="['react', 'vue', 'Svelte', 'angular']"
        placeholder="Select a framework"
        variant="plaincaps"
      />
    </Story>
  </Stories>
</template>
