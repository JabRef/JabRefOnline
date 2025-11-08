<script setup lang="ts">
import LandingPageFooter from './LandingPageFooter.vue'

// Mock the useAsyncData composable for legal notices and privacy policy
const mockLegalNotices = {
  body: {
    type: 'root',
    children: [
      {
        type: 'element',
        tag: 'p',
        children: [
          {
            type: 'text',
            value: 'Legal notices content goes here.',
          },
        ],
      },
    ],
  },
}

const mockPrivacyPolicy = {
  body: {
    type: 'root',
    children: [
      {
        type: 'element',
        tag: 'p',
        children: [
          {
            type: 'text',
            value: 'Privacy policy content goes here.',
          },
        ],
      },
    ],
  },
}

// Mock queryCollection
globalThis.queryCollection = (collection: string) => ({
  path: (path: string) => ({
    first: () => {
      if (path === '/legalnotices') return Promise.resolve(mockLegalNotices)
      if (path === '/privacypolicy') return Promise.resolve(mockPrivacyPolicy)
      return Promise.resolve(null)
    },
  }),
})
</script>

<template>
  <Stories
    title="LandingPageFooter"
    :component="LandingPageFooter"
  >
    <Story title="Default">
      <LandingPageFooter />
    </Story>
  </Stories>
</template>
