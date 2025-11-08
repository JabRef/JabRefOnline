<script setup lang="ts">
import { ref } from 'vue'
import LandingPageGetInvolved from './LandingPageGetInvolved.vue'

// Mock maintainers data
const mockMaintainers = ref([
  'John Doe',
  'Jane Smith',
  'Bob Johnson',
  'Alice Williams',
])
</script>

<template>
  <Stories
    title="LandingPageGetInvolved"
    :component="LandingPageGetInvolved"
  >
    <Story title="Get Involved Section">
      <template #default>
        <section id="getinvolved">
          <div class="container mx-auto px-4 pt-6 pb-4 md:py-16">
            <div
              class="flex flex-wrap flex-col justify-center text-center max-w-prose mx-auto"
            >
              <h1 class="pb-6 text-5xl">Get Involved!</h1>

              <p class="text-justify">
                JabRef was founded 2003 and has since been used by many students and
                researchers. Our mission is to advance knowledge and improve
                scientific research.
              </p>
              <p class="text-xl font-light text-center py-4">
                Created by researchers, for researchers.
              </p>
              <p class="text-justify">
                JabRef is developed and maintained by a multidisciplinary
                <n-popover trigger="hover">
                  <template #trigger>
                    <n-button text>core team</n-button>
                  </template>
                  <div class="px-4 py-1">
                    <ul
                      v-for="member in mockMaintainers"
                      :key="member"
                      class="list-disc"
                    >
                      <li class="text-sm">
                        {{ member }}
                      </li>
                    </ul>
                  </div>
                </n-popover>
                of PhD students, postdocs, and researchers in industry.
              </p>
            </div>
            <div class="flex flex-row flex-wrap lg:flex-nowrap pt-6 lg:pt-12">
              <div
                class="lg:min-w-0 mx-auto flex flex-col flex-no-shrink grow wrap-break-word text-center py-6 md:px-6 max-w-prose"
              >
                <n-button
                  text
                  type="primary"
                  class="text-xl mx-auto text-primary-500"
                >
                  <a href="#">
                    <Icon
                      name="ri:hearts-fill"
                      class="text-6xl"
                    />
                    <h4 class="text-2xl mb-3 font-semibold">Contribute</h4>
                  </a>
                </n-button>
                <h5 class="pb-2 text-xl">Help us build JabRef</h5>
                <p>
                  You do not need to be a developer to improve the documentation.
                </p>
              </div>
              <div
                class="lg:min-w-0 mx-auto flex flex-col flex-no-shrink grow wrap-break-word text-center py-6 md:px-6 max-w-prose"
              >
                <n-button
                  text
                  type="primary"
                  class="text-xl mx-auto text-primary-500"
                >
                  <a href="#">
                    <Icon
                      name="ri:gift-fill"
                      class="text-6xl"
                    />
                    <h4 class="text-2xl mb-3 font-semibold">Donate</h4>
                  </a>
                </n-button>
                <h5 class="pb-2 text-xl">Support the development</h5>
                <p>
                  Help us pay for project development and operating costs.
                </p>
              </div>
              <div
                class="lg:min-w-0 mx-auto flex flex-col flex-no-shrink grow wrap-break-word text-center py-6 md:px-6 max-w-prose"
              >
                <n-button
                  text
                  type="primary"
                  class="text-xl mx-auto text-primary-500"
                >
                  <a href="#">
                    <Icon
                      name="ri:code-s-slash-fill"
                      class="text-6xl"
                    />
                    <h4 class="text-2xl mb-3 font-semibold">Develop</h4>
                  </a>
                </n-button>
                <h5 class="pb-2 text-xl">Make JabRef even better</h5>
                <p>
                  JabRef is and always will be 100% free and open-source.
                </p>
              </div>
            </div>
          </div>
        </section>
      </template>
    </Story>
  </Stories>
</template>
