<template>
  <NaiveConfig :theme-config="themeConfig">
    <NuxtPage></NuxtPage>
  </NaiveConfig>
</template>

<script setup lang="ts">
import { theme } from '#tailwind-config'
import { ThemeConfig } from '@bg-dev/nuxt-naiveui'

const themeConfig: ThemeConfig = {
  shared: {
    common: {
      fontFamily: theme.fontFamily.sans.join(', '),
      lineHeight: theme.lineHeight.normal,
    },
  },
  light: {
    common: {
      primaryColor: theme.colors.primary[500],
      primaryColorHover: theme.colors.primary[600],
      primaryColorPressed: theme.colors.primary[700],
      primaryColorSuppl: theme.colors.primary[600],
    },
  },
  dark: {
    common: {
      primaryColor: theme.colors.primary[500],
      primaryColorHover: theme.colors.primary[400],
      primaryColorPressed: theme.colors.primary[600],
    },
  },
}
</script>
<style lang="css">
/* Workaround for https://github.com/becem-gharbi/nuxt-naiveui/issues/8 */
.n-button {
  background-color: var(--n-color) !important;
}
</style>
