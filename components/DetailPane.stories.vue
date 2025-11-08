<script setup lang="ts">
import { ref } from 'vue'
import DetailPane from './DetailPane.vue'
</script>

<template>
  <Stories
    title="DetailPane"
    :component="DetailPane"
  >
    <Story title="Closed">
      <div class="relative h-96">
        <DetailPane />
      </div>
    </Story>
    <Story title="With Custom Content">
      <div class="relative h-96">
        <DetailPane>
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-4">Custom Content</h2>
            <p>This is custom content displayed in the detail pane.</p>
          </div>
        </DetailPane>
      </div>
    </Story>
  </Stories>
</template>
