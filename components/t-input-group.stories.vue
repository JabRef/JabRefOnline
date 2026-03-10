<script setup lang="ts">
import { UFormField, UInput } from '#components'
</script>

<template>
  <Stories
    title="t-input-group"
    :component="UFormField"
  >
    <Story title="Default">
      <UFormField
        label="Label"
        help="Feedback"
      >
        <UInput value="Input text" />
      </UFormField>
    </Story>
    <Story title="Error">
      <UFormField
        label="Label"
        error="Feedback"
      >
        <UInput
          color="error"
          value="Input text"
        />
      </UFormField>
    </Story>
    <Story title="Success">
      <UFormField
        label="Label"
        help="Feedback"
      >
        <UInput
          color="success"
          value="Input text"
        />
      </UFormField>
    </Story>
    <Story title="Important">
      <UFormField
        label="Label"
        required
        help="Feedback"
      >
        <UInput value="Input text" />
      </UFormField>
    </Story>
  </Stories>
</template>
