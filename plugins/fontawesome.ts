import { config, library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Do not add css to pages, since this is done by Nuxt
config.autoAddCss = false

// Add icons
library.add(fas)

export default defineNuxtPlugin((nuxtApp) => {
  // @ts-expect-error: vue-fontawesome does not provide good types: https://github.com/FortAwesome/vue-fontawesome/issues/400
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
