<script setup lang="ts">
import HorizontalRule from './HorizontalRule.vue'
</script>

<template>
  <Stories
    title="HorizontalRule"
    :component="HorizontalRule"
  >
    <Story title="Default (no content)">
      <HorizontalRule />
    </Story>
    <Story title="With Text">
      <HorizontalRule content="OR" />
    </Story>
    <Story title="With Longer Text">
      <HorizontalRule content="Continue with" />
    </Story>
  </Stories>
</template>
