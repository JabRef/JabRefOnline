<script setup lang="ts">
import { UInput } from '#components'
</script>

<template>
  <Stories
    title="t-input"
    :component="UInput"
  >
    <Story title="Default">
      <UInput value="Input text" />
    </Story>
    <Story title="Error">
      <UInput
        value="Input text"
        color="error"
      />
    </Story>
    <Story title="Success">
      <UInput
        value="Input text"
        color="success"
      />
    </Story>
    <Story title="Plain">
      <UInput
        value="Input text"
        variant="none"
      />
    </Story>
  </Stories>
</template>
