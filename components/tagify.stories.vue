<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import Tagify from './tagify.vue'

const inputTags = ref([])
const textareaTags = ref([])
const whitelistTags = ref([])
</script>

<template>
  <Stories
    title="tagify"
    :component="Tagify"
  >
    <Story title="Input Type">
      <Tagify
        type="input"
        :value="inputTags"
        delimiters=","
        :whitelist="[]"
      />
    </Story>
    <Story title="Textarea Type">
      <Tagify
        type="textarea"
        :value="textareaTags"
        delimiters=","
        :whitelist="[]"
      />
    </Story>
    <Story title="With Whitelist">
      <Tagify
        type="input"
        :value="whitelistTags"
        delimiters=","
        :whitelist="[
          { value: 'JavaScript' },
          { value: 'TypeScript' },
          { value: 'Vue.js' },
          { value: 'React' },
          { value: 'Angular' },
        ]"
      />
    </Story>
  </Stories>
</template>
