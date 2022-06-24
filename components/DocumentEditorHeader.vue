<template>
  <p class="pl-3 uppercase text-xs text-gray-600 tracking-wider">
    {{ heading }}
  </p>
</template>
<script lang="ts">
export default defineComponent({
  props: { heading: { type: String, default: '' } },
})
</script>
