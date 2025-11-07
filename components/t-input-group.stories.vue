<script setup lang="ts">
// @ts-expect-error: not yet compatible with 'bundler' module resolution
import { TInput, TInputGroup } from '@variantjs/vue'
</script>

<template>
  <Stories
    title="t-input-group"
    :component="TInputGroup"
  >
    <Story title="Default">
      <t-input-group
        label="Label"
        feedback="Feedback"
      >
        <t-input value="Input text" />
      </t-input-group>
    </Story>
    <Story title="Error">
      <t-input-group
        variant="error"
        label="Label"
        feedback="Feedback"
      >
        <t-input
          variant="error"
          value="Input text"
        />
      </t-input-group>
    </Story>
    <Story title="Success">
      <t-input-group
        variant="success"
        label="Label"
        feedback="Feedback"
      >
        <t-input
          variant="success"
          value="Input text"
        />
      </t-input-group>
    </Story>
    <Story title="Important">
      <t-input-group
        variant="plain"
        label="Label"
        feedback="Feedback"
      >
        <t-input
          variant="plain"
          value="Input text"
        />
      </t-input-group>
    </Story>
  </Stories>
</template>
