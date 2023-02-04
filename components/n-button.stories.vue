<script setup lang="ts">
import { NButton } from 'naive-ui'
</script>
<template>
  <Stories
    title="n-button"
    :component="NButton"
  >
    <Story title="Default">
      <n-button>Button</n-button>
    </Story>
    <Story title="Error">
      <n-button type="error">error</n-button>
    </Story>
    <Story title="Success">
      <n-button type="success">success</n-button>
    </Story>
    <Story title="Primary">
      <n-button type="primary">primary</n-button>
    </Story>
    <Story title="Tertiary">
      <n-button type="tertiary">tertiary</n-button>
    </Story>
    <Story title="Link">
      <n-button text>Link</n-button>
    </Story>
  </Stories>
</template>
