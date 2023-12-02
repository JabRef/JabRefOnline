import type { Nuxt } from '@nuxt/schema'
import { buildDevStandalone } from '@storybook/core-server'
import type { PackageJson } from '@storybook/types'
import chalk from 'chalk'
import { defineNuxtModule, logger } from 'nuxt/kit'
import { withoutTrailingSlash } from 'ufo'

const path = '/_storybook/'
async function startStorybookServer(nuxt: Nuxt, nuxtUrl: string) {
  // Load package.json
  const packageJson = (await import(
    nuxt.options.rootDir + '/package.json'
  )) as PackageJson

  const options = {
    configDir: nuxt.options.rootDir + '/.storybook',
    port: 3001,
    ignorePreview: true,
    previewUrl: withoutTrailingSlash(nuxtUrl) + path + 'external-iframe',
    packageJson,
  }
  return await buildDevStandalone(options)
}

// TODO: Finish storybook as module
export default defineNuxtModule({
  hooks: {},
  setup(_moduleOptions, nuxt) {
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
    nuxt.hook('listen', async (_, listener: { url: string }) => {
      // const fullPath = `${withoutTrailingSlash(listener.url)}${path}`
      // logger.info(`Storybook: ${chalk.underline.yellow(fullPath)}`)
      if (nuxt.options.dev) {
        const wrap = logger.create({ level: 0 })
        try {
          // Hide all output from storybook
          wrap.wrapAll()
          const { address } = await startStorybookServer(nuxt, listener.url)
          /*
          // TODO: Try to expose the server on localhost:3000/_storybook
          nuxt.hook('build:extendRoutes', (routes) => {
            routes.push({
              path: '/_storybook',
              beforeEnter(to, from, next) {
                window.location.href = address
              },
            })
          })
          */
          logger.info(`Storybook: ${chalk.underline.yellow(address)}`)
          wrap.restoreAll()
        } catch (exception) {
          wrap.restoreAll()
          logger.error(exception)
        }
      }
    })
  },
})
