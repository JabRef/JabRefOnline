<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

useHead({
  meta: [
    {
      // Style browser UI consistent with dark/light mode
      name: 'theme-color',
      content: computed(() =>
        colorMode.value === 'dark' ? '#171717' : 'white',
      ),
    },
  ],
})
</script>
