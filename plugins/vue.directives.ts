// Adds custom Vue directives
// https://vuejs.org/v2/guide/custom-directive.html
export default defineNuxtPlugin((nuxtApp) => {
  // Register a global custom directive called `v-focus` that auto-focuses the given element
  nuxtApp.vueApp.directive('focus', {
    inserted(element) {
      element.focus()
    },
  })
})
