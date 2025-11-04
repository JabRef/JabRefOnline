<template>
  <!-- Auto-grow text-input, idea taken from https://css-tricks.com/auto-growing-inputs-textareas/ -->
  <span class="inline-block relative">
    <t-input
      :value="value"
      variant="plain"
      class="absolute w-full left-0 py-1"
      @input="update"
    />
    <span
      class="inline-block px-3 py-1 text-base invisible border"
      aria-hidden="true"
      >{{ value }}</span
    >
  </span>
</template>

<script setup lang="ts">
defineProps<{
  value?: string
}>()

const emit = defineEmits<{
  input: [value: string]
}>()

function update(newValue: string) {
  emit('input', newValue)
}
</script>
