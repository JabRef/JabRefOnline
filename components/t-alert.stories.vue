<script setup lang="ts">
import { UAlert } from '#components'
</script>

<template>
  <Stories
    title="t-alert"
    :component="UAlert"
  >
    <Story title="Default">
      <UAlert description="Hi there!" />
    </Story>
    <Story title="Error">
      <UAlert
        color="error"
        description="oops!"
      />
    </Story>
    <Story title="Success">
      <UAlert
        color="success"
        description="success!"
      />
    </Story>
  </Stories>
</template>
