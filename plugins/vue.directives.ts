import { defineNuxtPlugin } from '#app'

// Adds custom Vue directives
// https://vuejs.org/v2/guide/custom-directive.html
export default defineNuxtPlugin((nuxtApp) => {
  if (!nuxtApp) {
    // For some strange reason, nuxtApp is not defined for storybook, so don't do anything in this case
    return
  }

  // Register a global custom directive called `v-focus` that auto-focuses the given element
  nuxtApp.vueApp.directive('focus', {
    inserted(element) {
      element.focus()
    },
  })
})
