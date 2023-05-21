<template>
  <main>
    <ContentDoc :path="markdownPath" />
  </main>
</template>

<script setup lang="ts">
const route = useRoute('codeprojects-slug')
let markdownPath = 'codeprojects/'
if (route.params.slug == null || typeof route.params.slug === 'string') {
  markdownPath += route.params.slug
} else {
  markdownPath += route.params.slug
    .map((param) => param.toLowerCase())
    .join('/')
}
</script>
