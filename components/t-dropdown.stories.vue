<script setup lang="ts">
import { UDropdownMenu } from '#components'
</script>

<template>
  <Stories
    title="t-dropdown"
    :component="UDropdownMenu"
  >
    <Story title="Default">
      <UDropdownMenu
        :items="[
          [{ label: 'Your Profile' }, { label: 'Settings' }],
          [{ label: 'Sign out' }],
        ]"
      >
        <UButton>Dropdown</UButton>
      </UDropdownMenu>
    </Story>
    <Story title="Left aligned">
      <UDropdownMenu
        :content="{ align: 'end' }"
        :items="[
          [{ label: 'Your Profile' }, { label: 'Settings' }],
          [{ label: 'Sign out' }],
        ]"
      >
        <UButton>Dropdown</UButton>
      </UDropdownMenu>
    </Story>
  </Stories>
</template>
