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
let markdownPath = 'surveys/'

if (typeof route.params.slug === 'string') {
  markdownPath += route.params.slug
} else {
  // Workaround for https://github.com/nuxt/content/issues/1237: use /home.md instead /index.md as default
  const slugs = route.params.slug
  if (slugs[slugs.length - 1] === '') {
    slugs[slugs.length - 1] = 'home'
  }
  markdownPath += slugs.map((param) => param.toLowerCase()).join('/')
}
</script>
