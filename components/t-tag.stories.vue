<script setup lang="ts">
import { UBadge } from '#components'
</script>

<template>
  <Stories
    title="t-tag"
    :component="UBadge"
  >
    <Story title="Default">
      <UBadge>Hi there!</UBadge>
    </Story>
    <Story title="Soft">
      <UBadge variant="soft">Hi there!</UBadge>
    </Story>
    <Story title="Outline">
      <UBadge variant="outline">Hi there!</UBadge>
    </Story>
  </Stories>
</template>
