<template>
  <n-button
    type="primary"
    size="large"
    style="height: 3.2em"
    class="transition duration-200 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
  >
    <template #icon>
      <n-icon v-if="showIcon">
        <Icon name="material-symbols:download" />
      </n-icon>
    </template>
    <a
      class="text-2xl"
      :href
      >{{ text }}</a
    >
  </n-button>
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
