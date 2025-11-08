<template>
  <UButton
    color="primary"
    size="xl"
    class="h-[3.2em]"
  >
    <template
      v-if="showIcon"
      #leading
    >
      <Icon name="material-symbols:download" />
    </template>
    <a
      class="text-2xl"
      :href
      >{{ text }}</a
    >
  </UButton>
</template>
<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: '',
  },
  href: {
    type: String,
    default: '',
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
})
</script>
