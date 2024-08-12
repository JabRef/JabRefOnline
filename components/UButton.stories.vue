<script setup lang="ts">
import { UButton } from '#components'
</script>
<template>
  <Stories
    title="UButton"
    :component="UButton"
  >
    <Story title="Standard">
      <UButton>Button</UButton>
    </Story>
    <Story title="Error">
      <UButton color="error">error</UButton>
    </Story>
    <Story title="Success">
      <UButton color="success">success</UButton>
    </Story>
    <Story title="Link">
      <UButton variant="link">Link</UButton>
    </Story>
  </Stories>
</template>
