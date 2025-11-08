<script setup lang="ts">
import LandingPageFeatures from './LandingPageFeatures.vue'

// Mock features data
const mockFeatures = ref([
  {
    path: '/features/search',
    title: 'Search and discover',
    img: 'search.png',
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
    img: 'organize.png',
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
])
</script>

<template>
  <Stories
    title="LandingPageFeatures"
    :component="LandingPageFeatures"
  >
    <Story title="With Mock Features">
      <template #default>
        <div class="min-h-screen bg-white">
          <section id="features">
            <div
              v-for="(feature, index) in mockFeatures"
              :key="feature.path"
              class="container mx-auto px-4 pb-4 lg:pb-16 mt-4 max-w-(--breakpoint-xl)"
            >
              <div class="flex flex-wrap">
                <div
                  class="lg:w-3/5 sm:w-1/2"
                  :class="{
                    'md:pr-12': !(index % 2),
                    'md:pl-12 md:order-last': index % 2,
                  }"
                >
                  <hr />
                  <h2 class="text-4xl mt-5 font-semibold">{{ feature.title }}</h2>
                  <div class="prose text-2xl font-light">
                    <p>{{ feature.body.children[0].children[0].value }}</p>
                  </div>
                </div>
                <div
                  class="lg:w-2/5 sm:w-1/2 pt-3 flex items-center justify-center"
                  :class="{
                    'md:pl-12': !(index % 2),
                    'md:pr-12': index % 2,
                  }"
                >
                  <div class="w-full h-48 bg-gray-200 rounded-sm flex items-center justify-center">
                    <span class="text-gray-500">{{ feature.img }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </template>
    </Story>
  </Stories>
</template>
