import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        exclude: ['LandingPageFeatures'],
      },
    }),
    landing: defineCollection({
      type: 'page',
      source: 'LandingPageFeatures/*.md',
      schema: z.object({
        title: z.string(),
        img: z.string(),
      }),
    }),
  },
})
