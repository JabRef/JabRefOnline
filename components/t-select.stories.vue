<script setup lang="ts">
import { USelect } from '#components'
</script>

<template>
  <Stories
    title="t-select"
    :component="USelect"
  >
    <Story title="Default">
      <USelect
        :items="['react', 'vue', 'Svelte', 'angular']"
        placeholder="Select a framework"
      />
    </Story>
    <Story title="Plain">
      <USelect
        :items="['react', 'vue', 'Svelte', 'angular']"
        placeholder="Select a framework"
        variant="none"
      />
    </Story>
  </Stories>
</template>
