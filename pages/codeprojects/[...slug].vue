<template>
  <main>
    <ContentDoc :path="markdownPath" />
  </main>
</template>

<script setup lang="ts">
const route = useRoute('codeprojects-slug')
let markdownPath = 'codeprojects/'
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- typing issue?
if (route.params.slug != null) {
  markdownPath += (route.params.slug as string[])
    .map((param) => param.toLowerCase())
    .join('/')
}
</script>
