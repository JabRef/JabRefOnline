<template>
  <div>
    <slot mdc-unwrap="p" />
  </div>
</template>
<script setup lang="ts">
// Workaround for https://github.com/vuejs/language-tools/issues/5082
defineSlots<{
  default: unknown
}>()
</script>
