<script setup lang="ts">
import { UCheckbox } from '#components'
</script>

<template>
  <Stories
    title="t-checkbox"
    :component="UCheckbox"
  >
    <Story title="Default">
      <UCheckbox :default-value="true" />
    </Story>
    <Story title="Error">
      <UCheckbox
        :default-value="true"
        color="error"
      />
    </Story>
    <Story title="Success">
      <UCheckbox
        :default-value="true"
        color="success"
      />
    </Story>
    <Story title="Primary">
      <UCheckbox
        :default-value="true"
        color="primary"
      />
    </Story>
  </Stories>
</template>
