<script setup lang="ts">
import LandingPageGetInvolved from './LandingPageGetInvolved.vue'

// Mock the useFetch composable to return mock maintainers
const mockMaintainers = [
  'Christoph Schwentker',
  'Tobias Diez',
  'Carl Christian Snethlage',
  'Oliver Kopp',
  'Benedikt Tutzer',
]

// Mock useFetch globally for this story
globalThis.useFetch = (url: string, options?: any) => {
  return {
    data: ref(mockMaintainers),
    pending: ref(false),
    error: ref(null),
    refresh: () => Promise.resolve(),
  }
}
</script>

<template>
  <Stories
    title="LandingPageGetInvolved"
    :component="LandingPageGetInvolved"
  >
    <Story title="Default">
      <LandingPageGetInvolved />
    </Story>
  </Stories>
</template>
