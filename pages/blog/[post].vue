<template>
  <main class="max-w-3xl mx-auto">
    <div class="pt-24 pb-14">
      <ContentDoc
        v-slot="{ doc }"
        :path="markdownPath"
      >
        <h1 class="font-bold text-5xl py-8">
          <n-text type="primary">{{ doc.title }}</n-text>
        </h1>
        <ContentRenderer
          :value="doc"
          class="prose"
        />
      </ContentDoc>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'content' })

const route = useRoute()
let markdownPath = 'blog/'

if (typeof route.params.post === 'string') {
  markdownPath += route.params.post
} else {
  markdownPath += route.params.post
    .map((param) => param.toLowerCase())
    .join('/')
}
</script>
