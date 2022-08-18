import { defineNuxtModule, logger } from '@nuxt/kit'
import chalk from 'chalk'
import { withoutTrailingSlash } from 'ufo'

// TODO: Finish storybook as module
export default defineNuxtModule({
  hooks: {},
  setup(_moduleOptions, nuxt) {
    const path = '/_storybook/'
    /*
    addServerMiddleware({
      path,
      handler: (request, result) => {
        // if file is external-iframe.html
        if (request.url?.endsWith('external-iframe.html')) {
          result.end(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title></title>
  </head>
  <body>
    <div id="root"></div>
    <div id="docs-root"></div>
    <script type="module" src="./_storybook/storybook.ts"></script>
    <div class="sb-errordisplay sb-wrapper">
      <div id="error-message" class="sb-heading"></div>
      <pre class="sb-errordisplay_code"><code id="error-stack"></code></pre>
    </div>
  </body>
</html>
        `)
        } else if (request.url?.endsWith('storybook.ts')) {
          result.end(`
import { configure } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'

setOptions({
  name: '${nuxt.options.name}',
  url: '${withoutTrailingSlash(nuxt.options.baseUrl)}${path}',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  downPanelInRight: true,
  hierarchyRootSeparator: /\|/,
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/
})

configure(() => {
  require('../src/stories')
}, module)
        `)
        }
      },
    })
    */
    nuxt.hook('listen', (_, listener) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
      const fullPath = `${withoutTrailingSlash(listener.url)}${path}`
      logger.info(`Storybook: ${chalk.underline.yellow(fullPath)}`)
    })
  },
})
