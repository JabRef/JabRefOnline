<template>
  <section>
    <div class="text-center">
      <Logo class="m-auto h-32" />
      <h1 class="text-5xl font-light pt-3">Error {{ error.statusCode }}</h1>
      <h2 class="text-xl font-light text-gray-500 pt-3">
        {{ error.message }}
      </h2>
      <nuxt-link v-if="error.statusCode === 404" class="button" to="/">
        Homepage
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'bare',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>
