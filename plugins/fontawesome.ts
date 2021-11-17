import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { defineNuxtPlugin } from '#app'

// Do not add css to pages, since this is done by Nuxt
config.autoAddCss = false

// Add icons
library.add(fas)

export default defineNuxtPlugin((nuxtApp) => {
  if (!nuxtApp) {
    // For some strange reason, nuxtApp is not defined for storybook, so don't do anything in this case
    return
  }

  // Register the component globally
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
