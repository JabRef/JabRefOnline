declare module '@tailwindcss/forms'

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

declare module 'vue-virtual-scroll-list' {
  import Vue from 'vue'
  export default Vue
}

// Allows to import vue files
// Taken from https://github.com/vuejs/vue/issues/5298#issuecomment-761577986
declare module '*.vue' {
  import { defineComponent } from '@vue/composition-api'
  const component: ReturnType<typeof defineComponent>
  export default component
}
