<template>
  <p class="pl-3 uppercase text-xs text-gray-600 tracking-wider">
    {{ heading }}
  </p>
</template>

<script setup lang="ts">
defineProps<{
  heading: string
}>()
</script>
