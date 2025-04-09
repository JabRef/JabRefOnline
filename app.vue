<template>
  <NaiveConfig>
    <NuxtPage />
  </NaiveConfig>
</template>

<style lang="css">
/* Workaround for https://github.com/becem-gharbi/nuxt-naiveui/issues/8 */
.n-button {
  background-color: var(--n-color) !important;
}
</style>
