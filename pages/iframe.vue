<template>
  <div>
    <div id="root"></div>
    <div id="docs-root"></div>
    <div class="sb-errordisplay sb-wrapper">
      <div
        id="error-message"
        class="sb-heading"
      ></div>
      <pre class="sb-errordisplay_code"><code id="error-stack"></code></pre>
    </div>
  </div>
</template>
<script lang="ts">
// Based on https://github.com/storybookjs/storybook/tree/next/examples/standalone-preview
// The idea is that we use nuxt to render the stories
import { RenderContext, start } from '@storybook/core'
import { VueFramework } from '@storybook/vue3'
// @ts-expect-error: This is not officially exported to use ugly workaround
import { decorateStory } from '@storybook/vue3/dist/esm/client/preview/decorateStory'
import { mount } from 'mount-vue-component'
import * as Comp1 from '~/components/t-input.stories'

export function renderToDOM(
  { title, name, storyFn, showMain, showError }: RenderContext<VueFramework>,
  domElement: HTMLElement
): void {
  const element = storyFn()

  if (!element) {
    showError({
      title: `Expecting a Vue component from the story: "${name}" of "${title}".`,
      description: `
        Did you forget to return the Vue component from the story?
        Use "() => ({ template: '<my-comp></my-comp>' })" or "() => ({ components: MyComp, template: '<my-comp></my-comp>' })" when defining the story.
      `,
    })
    return
  }

  showMain()

  mount(element, { element: domElement, app: useNuxtApp().vueApp })
}
// @ts-expect-error: storybook typing is inconsistent
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const api = start(renderToDOM, { decorateStory })
const framework = 'vue3'
definePageMeta({ layout: false, alias: '/iframe.html' })

export default defineComponent({
  setup: () => {
    // @ts-ignore: module is not used
    api.configure(framework, () => [Comp1], null)
  },
})
</script>
