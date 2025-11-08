<script setup lang="ts">
import DetailPane from './DetailPane.vue'
</script>

<template>
  <Stories
    title="DetailPane"
    :component="DetailPane"
  >
    <Story title="Visual Structure">
      <template #default>
        <div class="relative h-screen bg-gray-100">
          <p class="p-4 text-sm text-gray-600">
            Note: DetailPane requires Pinia store context to function.
            This story shows the visual structure when open.
          </p>
          <!-- Mock the open state visually -->
          <div
            id="details"
            class="fixed top-20 bottom-0 right-0 flex flex-col flex-wrap bg-white border-l border-gray-300 z-40 w-1/3 md:shadow-xs p-4"
          >
            <div
              class="absolute top-10 -left-3.5 w-7 h-7 rounded-full bg-white border border-gray-300 md:shadow-xs flex items-center justify-center active:border-gray-300 transform text-gray-400 hover:scale-110 hover:border-gray-400 hover:text-gray-500"
            >
              <n-button
                quaternary
                circle
              >
                <Icon name="ri:close-fill" />
              </n-button>
            </div>
            <div class="p-4">
              <h2 class="text-xl font-semibold mb-4">Detail Pane Content</h2>
              <p>This pane slides in from the right when a document is selected.</p>
              <p class="mt-2 text-sm text-gray-500">
                In the actual application, this would show the DocumentEditor component.
              </p>
            </div>
          </div>
        </div>
      </template>
    </Story>
  </Stories>
</template>
