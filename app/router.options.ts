import type { RouterConfig } from '@nuxt/schema'

// Allow anchor navigation with nuxtlink
// ex: <NuxtLink to="#top"> To Top </NuxtLink>
// https://github.com/nuxt/framework/discussions/5561
// https://router.vuejs.org/api/#routeroptions
export default <RouterConfig>{
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
  },
}
