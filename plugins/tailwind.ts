import TTable from '~/components/TTable.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('t-table', TTable)
})
