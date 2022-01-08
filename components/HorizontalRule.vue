<template>
  <hr
    class="border-gray-300 text-gray-500 text-center text-base hr-with-text"
    :data-hr-content="content"
    style="--bg: white; --p: 0 10px; --trans-x: -50%; --trans-y: -50%"
  />
</template>
<script lang="ts">
export default {
  props: {
    content: {
      type: String,
      default: '',
    },
  },
}
</script>
<style>
.hr-with-text::after {
  background-color: var(--bg);
  content: attr(data-hr-content);
  padding: var(--p);
  position: absolute;
  transform: translate(var(--trans-x), var(--trans-y));
}
</style>
