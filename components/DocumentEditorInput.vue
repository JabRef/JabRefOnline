<template>
  <!-- Auto-grow text-input, idea taken from https://css-tricks.com/auto-growing-inputs-textareas/ -->
  <span class="inline-block relative">
    <t-input
      v-model="value"
      variant="plain"
      class="absolute w-full left-0 py-1"
    />
    <span
      class="inline-block px-3 py-1 text-base invisible border"
      aria-hidden="true"
      >{{ value }}</span
    >
  </span>
</template>

<script setup lang="ts">
const value = defineModel<string | null | Date>()
</script>
