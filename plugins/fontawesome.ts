import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

// Do not add css to pages, since this is done by Nuxt
config.autoAddCss = false

// Add icons
library.add(fas)

export default defineNuxtPlugin((nuxtApp) => {
  // @ts-ignore: Library doesn't seem to provide correct typing infos
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
