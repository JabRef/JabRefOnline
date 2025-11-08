<script setup lang="ts">
import LandingPageFeatures from './LandingPageFeatures.vue'

// Mock the useAsyncData composable to return mock features
const mockFeatures = [
  {
    path: '/features/search',
    title: 'Search and discover',
    img: 'undraw_file_searching_duff.svg',
    body: {
      type: 'root',
      children: [
        {
          type: 'element',
          tag: 'p',
          children: [
            {
              type: 'text',
              value: 'Quickly find the references you need with powerful search capabilities.',
            },
          ],
        },
      ],
    },
  },
  {
    path: '/features/organize',
    title: 'Organize your library',
    img: 'undraw_folder_files_nweq.svg',
    body: {
      type: 'root',
      children: [
        {
          type: 'element',
          tag: 'p',
          children: [
            {
              type: 'text',
              value: 'Keep your references organized with groups, keywords, and custom fields.',
            },
          ],
        },
      ],
    },
  },
]

// Mock queryCollection
globalThis.queryCollection = () => ({
  all: () => Promise.resolve(mockFeatures),
})
</script>

<template>
  <Stories
    title="LandingPageFeatures"
    :component="LandingPageFeatures"
  >
    <Story title="With Features">
      <LandingPageFeatures />
    </Story>
  </Stories>
</template>
