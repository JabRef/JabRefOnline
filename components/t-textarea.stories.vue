<script setup lang="ts">
import { UTextarea } from '#components'
</script>

<template>
  <Stories
    title="t-textarea"
    :component="UTextarea"
  >
    <Story title="Default">
      <UTextarea value="Input text" />
    </Story>
    <Story title="Plain">
      <UTextarea
        value="Input text"
        variant="none"
      />
    </Story>
  </Stories>
</template>
