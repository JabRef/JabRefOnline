<script setup lang="ts">
import DownloadButton from './DownloadButton.vue'
</script>

<template>
  <Stories
    title="DownloadButton"
    :component="DownloadButton"
  >
    <Story title="Default">
      <DownloadButton
        text="Download JabRef"
        href="https://github.com/JabRef/jabref/releases/latest"
      />
    </Story>
    <Story title="Without Icon">
      <DownloadButton
        text="Download"
        href="#"
        :show-icon="false"
      />
    </Story>
    <Story title="Custom Text">
      <DownloadButton
        text="Get Latest Version"
        href="#"
      />
    </Story>
  </Stories>
</template>
