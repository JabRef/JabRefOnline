<script setup lang="ts">
import PasswordInput from './PasswordInput.vue'
</script>

<template>
  <Stories
    title="PasswordInput"
    :component="PasswordInput"
  >
    <Story title="Default">
      <PasswordInput placeholder="Enter password" />
    </Story>
    <Story title="With Value">
      <PasswordInput
        placeholder="Password"
        value="SecretPassword123"
      />
    </Story>
  </Stories>
</template>
