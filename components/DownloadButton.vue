<template>
  <UButton
    variant="solid"
    size="xl"
    class="h-14"
  >
    <template #leading>
      <Icon 
        v-if="showIcon"
        name="material-symbols:download" 
      />
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
