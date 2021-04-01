// Adds custom Vue directives
// https://vuejs.org/v2/guide/custom-directive.html
import Vue from 'vue'

// Register a global custom directive called `v-focus` that auto-focuses the given element
Vue.directive('focus', {
  inserted(element) {
    element.focus()
  },
})
