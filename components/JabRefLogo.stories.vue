<script setup lang="ts">
import JabRefLogo from './JabrefLogo.vue'
</script>

<template>
  <!-- @vue-expect-error: wrong ts of vue-stories -->
  <Stories
    title="JabRef Logo"
    :component="JabRefLogo"
  >
    <Story title="Standard">
      <JabRefLogo />
    </Story>
  </Stories>
</template>
