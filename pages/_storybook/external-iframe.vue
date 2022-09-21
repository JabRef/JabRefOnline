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
import { RenderContext, start } from '@storybook/core-client'
import { VueFramework } from '@storybook/vue3'
// @ts-expect-error: This is not officially exported to use ugly workaround
import { decorateStory } from '@storybook/vue3/dist/esm/client/preview/decorateStory'
import { mount } from 'mount-vue-component'
import * as JabRefLogoStories from '~/components/JabRefLogo.stories'
import * as NButtonStories from '~/components/n-button.stories'
import * as TAlertStories from '~/components/t-alert.stories'
import * as TCheckboxStories from '~/components/t-checkbox.stories'
import * as TDropdownStories from '~/components/t-dropdown.stories'
import * as TInputGroupStories from '~/components/t-input-group.stories'
import * as TInputStories from '~/components/t-input.stories'
import * as TNuxtLinkStories from '~/components/t-nuxtlink.stories'
import * as TSelectStories from '~/components/t-select.stories'
import * as TTableStories from '~/components/t-table.stories'
import * as TTagStories from '~/components/t-tag.stories'
import * as TTextareaStories from '~/components/t-textarea.stories'

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
    // @ts-expect-error: module is not used
    api.configure(
      framework,
      () => [
        JabRefLogoStories,
        TAlertStories,
        NButtonStories,
        TCheckboxStories,
        TDropdownStories,
        TInputGroupStories,
        TInputStories,
        TNuxtLinkStories,
        TSelectStories,
        TTableStories,
        TTagStories,
        TTextareaStories,
      ],
      undefined
    )
  },
})
</script>
<!-- Style taken from node_modules/@storybook/core-common/dist/esm/templates/base-preview-head.html -->
<style>
:not(.sb-show-preparing-story) > .sb-preparing-story,
:not(.sb-show-preparing-docs) > .sb-preparing-docs,
:not(.sb-show-nopreview) > .sb-nopreview,
:not(.sb-show-errordisplay) > .sb-errordisplay {
  display: none;
}

.sb-show-main.sb-main-centered {
  margin: 0;
  display: flex;
  align-items: center;
  min-height: 100vh;
}

.sb-show-main.sb-main-centered #root {
  box-sizing: border-box;
  margin: auto;
  padding: 1rem;
  max-height: 100%; /* Hack for centering correctly in IE11 */
}

/* Vertical centering fix for IE11 */
@media screen and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .sb-show-main.sb-main-centered:after {
    content: '';
    min-height: inherit;
    font-size: 0;
  }
}

.sb-show-main.sb-main-fullscreen {
  margin: 0;
  padding: 0;
  display: block;
}

.sb-show-main.sb-main-padded {
  margin: 0;
  padding: 1rem;
  display: block;
  box-sizing: border-box;
}

.sb-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  font-family: 'Nunito Sans', -apple-system, '.SFNSText-Regular',
    'San Francisco', BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica,
    Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow: auto;
}

.sb-heading {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.2px;
  margin: 10px 0;
  padding-right: 25px;
}

.sb-nopreview {
  display: flex;
  align-content: center;
  justify-content: center;
}

.sb-nopreview_main {
  margin: auto;
  padding: 30px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.03);
}

.sb-nopreview_heading {
  text-align: center;
}

.sb-errordisplay {
  border: 20px solid rgb(187, 49, 49);
  background: #222;
  color: #fff;
  z-index: 999999;
}

.sb-errordisplay_code {
  padding: 10px;
  background: #000;
  color: #eee;
  font-family: 'Operator Mono', 'Fira Code Retina', 'Fira Code',
    'FiraCode-Retina', 'Andale Mono', 'Lucida Console', Consolas, Monaco,
    monospace;
}

.sb-errordisplay pre {
  white-space: pre-wrap;
}

@-webkit-keyframes sb-rotate360 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes sb-rotate360 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes sb-glow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
@keyframes sb-glow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

/* We display the preparing loaders *over* the rendering story */
.sb-preparing-story,
.sb-preparing-docs {
  background-color: white;
}

.sb-loader {
  -webkit-animation: sb-rotate360 0.7s linear infinite;
  animation: sb-rotate360 0.7s linear infinite;
  border-color: rgba(97, 97, 97, 0.29);
  border-radius: 50%;
  border-style: solid;
  border-top-color: #646464;
  border-width: 2px;
  display: inline-block;
  height: 32px;
  left: 50%;
  margin-left: -16px;
  margin-top: -16px;
  mix-blend-mode: difference;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transition: all 200ms ease-out;
  vertical-align: top;
  width: 32px;
  z-index: 4;
}

.sb-previewBlock {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 0;
  margin: 25px auto 40px;
  max-width: 600px;
}

.sb-previewBlock_header {
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0 -1px 0 0 inset;
  display: flex;
  gap: 14px;
  height: 40px;
  padding: 0 12px;
}

.sb-previewBlock_icon {
  -webkit-animation: sb-glow 1.5s ease-in-out infinite;
  animation: sb-glow 1.5s ease-in-out infinite;
  background: #e6e6e6;
  height: 14px;
  width: 14px;
}
.sb-previewBlock_icon:last-child {
  margin-left: auto;
}

.sb-previewBlock_body {
  -webkit-animation: sb-glow 1.5s ease-in-out infinite;
  animation: sb-glow 1.5s ease-in-out infinite;
  height: 182px;
  position: relative;
}

.sb-argstableBlock {
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 13px;
  line-height: 20px;
  margin: 25px auto 40px;
  max-width: 600px;
  text-align: left;
  width: 100%;
}
.sb-argstableBlock th:first-of-type,
.sb-argstableBlock td:first-of-type {
  padding-left: 20px;
}
.sb-argstableBlock th:nth-of-type(2),
.sb-argstableBlock td:nth-of-type(2) {
  width: 35%;
}
.sb-argstableBlock th:nth-of-type(3),
.sb-argstableBlock td:nth-of-type(3) {
  width: 15%;
}
.sb-argstableBlock th:laste-of-type,
.sb-argstableBlock td:laste-of-type {
  width: 25%;
  padding-right: 20px;
}
.sb-argstableBlock th span,
.sb-argstableBlock td span {
  -webkit-animation: sb-glow 1.5s ease-in-out infinite;
  animation: sb-glow 1.5s ease-in-out infinite;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 0;
  box-shadow: none;
  color: transparent;
}
.sb-argstableBlock th {
  padding: 10px 15px;
}

.sb-argstableBlock-body {
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 1px, rgba(0, 0, 0, 0.065) 0 0 0 1px;
}
.sb-argstableBlock-body tr {
  background: transparent;
  overflow: hidden;
}
.sb-argstableBlock-body tr:not(:first-child) {
  border-top: 1px solid #e6e6e6;
}
.sb-argstableBlock-body tr:first-child td:first-child {
  border-top-left-radius: 4px;
}
.sb-argstableBlock-body tr:first-child td:last-child {
  border-top-right-radius: 4px;
}
.sb-argstableBlock-body tr:last-child td:first-child {
  border-bottom-left-radius: 4px;
}
.sb-argstableBlock-body tr:last-child td:last-child {
  border-bottom-right-radius: 4px;
}
.sb-argstableBlock-body td {
  background: #fff;
  padding-bottom: 10px;
  padding-top: 10px;
  vertical-align: top;
}
.sb-argstableBlock-body td:not(:first-of-type) {
  padding-left: 15px;
  padding-right: 15px;
}
.sb-argstableBlock-body button {
  -webkit-animation: sb-glow 1.5s ease-in-out infinite;
  animation: sb-glow 1.5s ease-in-out infinite;
  background-color: rgba(0, 0, 0, 0.1);
  border: 0;
  border-radius: 0;
  box-shadow: none;
  color: transparent;
  display: inline;
  font-size: 12px;
  line-height: 1;
  padding: 10px 16px;
}

.sb-argstableBlock-summary {
  margin-top: 4px;
}

.sb-argstableBlock-code {
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 2px 5px;
}
</style>
