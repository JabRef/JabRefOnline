<template>
  <!-- Auto-grow text-input, idea taken from https://css-tricks.com/auto-growing-inputs-textareas/ -->
  <span class="inline-block relative">
    <UInput
      :model-value="displayValue"
      variant="none"
      class="absolute w-full left-0 py-1"
      @update:model-value="(v) => (value = v)"
    />
    <span
      class="inline-block px-3 py-1 text-base invisible border"
      aria-hidden="true"
      >{{ displayValue }}</span
    >
  </span>
</template>

<script setup lang="ts">
const value = defineModel<string | null | Date>()
const displayValue = computed(() => {
  if (value.value instanceof Date) {
    return value.value.toISOString()
  }
  return value.value ?? undefined
})
</script>
