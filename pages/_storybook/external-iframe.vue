<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <meta
        http-equiv="X-UA-Compatible"
        content="ie=edge"
      />
      <title></title>
    </head>
    <body>
      <div id="root"></div>
      <div id="docs-root"></div>
      <div class="sb-errordisplay sb-wrapper">
        <div
          id="error-message"
          class="sb-heading"
        ></div>
        <pre class="sb-errordisplay_code"><code id="error-stack"></code></pre>
      </div>
    </body>
  </html>
</template>
<script lang="ts">
import { configure, addParameters } from '@storybook/vue3'
import { DocsPage, DocsContainer } from '@storybook/addon-docs'

import * as Comp1 from '~/components/t-input.stories'

definePageMeta({ layout: false })

addParameters({
  docs: {
    page: DocsPage,
    container: DocsContainer,
  },
})

configure(() => [Comp1], module)
</script>
