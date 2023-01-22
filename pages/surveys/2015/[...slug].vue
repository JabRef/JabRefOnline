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

const route = useRoute()
let markdownPath = 'surveys/2015/'

if (typeof route.params.slug === 'string') {
  markdownPath += route.params.slug
} else {
  markdownPath += route.params.slug
    .map((param) => param.toLowerCase())
    .join('/')
}
</script>
