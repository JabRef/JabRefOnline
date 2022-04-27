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

import { configure } from '@storybook/vue3'

import * as Comp1 from '~/components/t-input.stories'

definePageMeta({ layout: false })

configure(() => [Comp1], module)
</script>
