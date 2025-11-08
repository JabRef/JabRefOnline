<script setup lang="ts">
import LandingPageFooter from './LandingPageFooter.vue'
</script>

<template>
  <Stories
    title="LandingPageFooter"
    :component="LandingPageFooter"
  >
    <Story title="Footer Layout">
      <template #default>
        <footer class="md:pb-4 md:pt-8">
          <div
            class="container mx-auto pr-4 pl-8 md:pl-4 py-6 border-t border-gray-200 flex flex-col md:flex-row flex-wrap max-w-(--breakpoint-lg)"
          >
            <div class="w-4/12 md:w-1/5 md:mx-1/6">
              <JabrefLogo class="max-w-full max-h-44 h-auto md:p-3" />
            </div>
            <div class="md:w-1/5 md:mx-1/6 md:px-4">
              <ul class="flex flex-wrap list-none pl-0 mb-0 flex-col">
                <li class="py-2">
                  <strong class="text-gray-700">Install</strong>
                </li>
                <li class="py-1">
                  <a
                    class="no-underline text-sm text-gray-800 hover:text-primary-800"
                    href="#"
                  >
                    Desktop apps
                  </a>
                </li>
                <li class="py-1">
                  <a
                    class="no-underline text-sm text-gray-800 hover:text-primary-800"
                    href="#"
                  >
                    Browser extensions
                  </a>
                </li>
              </ul>
            </div>
            <div class="md:w-1/5 md:px-4">
              <ul class="flex flex-wrap list-none pl-0 mb-0 flex-col">
                <li class="py-2">
                  <strong class="text-gray-700">Links</strong>
                </li>
                <li class="py-1">
                  <a
                    class="no-underline text-sm text-gray-800 hover:text-primary-800"
                    href="#"
                  >
                    Resources
                  </a>
                </li>
              </ul>
            </div>
            <div class="md:w-1/5 md:px-4">
              <ul class="flex flex-wrap list-none pl-0 mb-0 flex-col">
                <li class="py-2">
                  <strong class="text-gray-700">Contribute</strong>
                </li>
                <li class="py-1">
                  <a
                    class="no-underline text-sm text-gray-800 hover:text-primary-800"
                    href="#"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div class="md:w-1/5 md:px-4">
              <ul class="flex flex-wrap list-none pl-0 mb-0 flex-col">
                <li class="py-2">
                  <strong class="text-gray-700">Help & Contact</strong>
                </li>
                <li class="py-1">
                  <a
                    class="no-underline text-sm text-gray-800 hover:text-primary-800"
                    href="#"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </template>
    </Story>
  </Stories>
</template>
