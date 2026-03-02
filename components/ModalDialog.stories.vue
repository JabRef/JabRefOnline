<script setup lang="ts">
import { ref } from 'vue'
import ModalDialog from './ModalDialog.vue'

const showSimpleModal = ref(false)
const showCustomModal = ref(false)
</script>

<template>
  <Stories
    title="ModalDialog"
    :component="ModalDialog"
  >
    <Story title="Simple Modal">
      <div>
        <n-button @click="showSimpleModal = true">Open Modal</n-button>
        <ModalDialog
          v-model="showSimpleModal"
          header="Simple Modal"
        >
          <p>This is a simple modal dialog with default content and footer.</p>
        </ModalDialog>
      </div>
    </Story>
    <Story title="With Custom Content">
      <div>
        <n-button @click="showCustomModal = true">Open Modal</n-button>
        <ModalDialog
          v-model="showCustomModal"
          header="Confirmation Dialog"
        >
          <p class="text-lg">
            Are you sure you want to proceed with this action?
          </p>
          <p class="text-sm text-gray-500 mt-2">
            This action cannot be undone.
          </p>
        </ModalDialog>
      </div>
    </Story>
  </Stories>
</template>
