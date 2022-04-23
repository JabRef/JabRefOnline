<template>
  <section>
    <Portal to="side">
      <img
        class="w-11/12 mx-auto"
        src="~/assets/undraw_server_down_s4lk.svg"
      />
    </Portal>
    <div class="text-center">
      <jabref-logo class="m-auto h-32" />
      <h1 class="text-5xl font-light pt-3">Error {{ error.statusCode }}</h1>
      <h2 class="text-xl font-light text-gray-500 pt-3">
        {{ error.message }}
      </h2>
      <nuxt-link
        v-if="error.statusCode === 404"
        class="button"
        to="/"
      >
        Homepage
      </nuxt-link>
    </div>
  </section>
</template>

<script lang="ts">
definePageMeta({ layout: 'bare' })
export default defineComponent({
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
})
</script>
