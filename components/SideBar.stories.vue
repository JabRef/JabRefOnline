<script setup lang="ts">
import SideBar from './SideBar.vue'
</script>

<template>
  <Stories
    title="SideBar"
    :component="SideBar"
  >
    <Story title="Default">
      <div class="h-screen">
        <SideBar />
      </div>
    </Story>
  </Stories>
</template>
