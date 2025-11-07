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
      <UButton color="red">error</UButton>
    </Story>
    <Story title="Success">
      <UButton color="green">success</UButton>
    </Story>
    <Story title="Primary">
      <UButton color="primary">primary</UButton>
    </Story>
    <Story title="Tertiary">
      <UButton variant="ghost">tertiary</UButton>
    </Story>
    <Story title="Link">
      <UButton variant="link">Link</UButton>
    </Story>
  </Stories>
</template>
