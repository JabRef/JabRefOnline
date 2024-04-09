<template>
  <main>
    <ContentDoc
      :path="markdownPath"
      class="prose mx-auto"
    />
  </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'content' })

const route = useRoute('surveys-2015-slug')
let markdownPath = 'surveys/2015/'

if (route.params.slug != null) {
  markdownPath += route.params.slug
    .map((param) => param.toLowerCase())
    .join('/')
}
</script>
