<template>
  <main>
    <ContentRenderer
      v-if="page"
      :value="page"
      class="prose mx-auto"
    />
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('pages').path(route.path.toLowerCase()).first()
})
</script>
