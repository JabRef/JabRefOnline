<script setup lang="ts">
const props = defineProps()
</script>

<template>
  <div>
    Propsu:
    <pre v-html="JSON.stringify(props, null, 2)" />
  </div>
</template>
