<script setup lang="ts">
import TNuxtlink from './t-nuxtlink'
</script>

<template>
  <Stories
    title="t-nuxtlink"
    :component="TNuxtlink"
  >
    <Story title="Default">
      <t-nuxtlink href="#"> nuxtlink </t-nuxtlink>
    </Story>
  </Stories>
</template>
