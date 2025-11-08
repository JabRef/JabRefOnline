<script setup lang="ts">
import { UButton } from '#components'
</script>
<template>
  <Stories
    title="UButton"
    :component="UButton"
  >
    <Story title="Standard">
      <UButton variant="solid">Button</UButton>
    </Story>
    <Story title="Error">
      <UButton variant="solid" color="error">error</UButton>
    </Story>
    <Story title="Success">
      <UButton variant="solid" color="success">success</UButton>
    </Story>
    <Story title="Primary">
      <UButton variant="solid" color="primary">primary</UButton>
    </Story>
    <Story title="Ghost">
      <UButton variant="ghost">ghost</UButton>
    </Story>
    <Story title="Link">
      <UButton variant="link">Link</UButton>
    </Story>
  </Stories>
</template>
