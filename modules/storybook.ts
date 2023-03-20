import { Nuxt } from '@nuxt/schema'
import type { StorybookConfig } from '@storybook/core-common'
import { loadAllPresets } from '@storybook/core-common'
import { defineNuxtModule, logger } from 'nuxt/kit'
// @ts-expect-error: internal
import { storybookDevServer } from '@storybook/core-server/dist/esm/dev-server'
// @ts-expect-error: internal
import { getManagerBuilder } from '@storybook/core-server/dist/esm/utils/get-manager-builder'
// @ts-expect-error: internal
import { getPreviewBuilder } from '@storybook/core-server/dist/esm/utils/get-preview-builder'
// @ts-expect-error: internal
import vueStorybook from '@storybook/vue3/dist/cjs/server/options'
import chalk from 'chalk'
import { LogLevel } from 'consola'
import { withoutTrailingSlash } from 'ufo'

const path = '/_storybook/'

// This function is mostly taken from @storybook/core-server/build-dev
async function startStorybookServer(nuxt: Nuxt, nuxtUrl: string) {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
  const options = {
    ...vueStorybook,
    configDir: nuxt.options.rootDir + '/.storybook',
    managerCache: false,
    configType: 'DEVELOPMENT',
    ignorePreview: true,
    previewUrl: withoutTrailingSlash(nuxtUrl) + path + 'external-iframe',
    port: 3001,
  }

  const previewBuilder = await getPreviewBuilder(options.configDir)
  const managerBuilder = await getManagerBuilder(options.configDir)
  const presets = loadAllPresets({
    corePresets: [
      '@storybook/core-server/dist/cjs/presets/common-preset',
      // require.resolve('./presets/common-preset'),
      ...managerBuilder.corePresets,
      ...previewBuilder.corePresets,
      // require.resolve('./presets/babel-cache-preset'),
    ],
    overridePresets: previewBuilder.overridePresets,
    ...options,
  })

  const features = await presets.apply<StorybookConfig['features']>('features')
  // global.FEATURES = features
  const fullOptions = {
    presets,
    features,
    ...options,
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await storybookDevServer(fullOptions)
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
    nuxt.hook('listen', async (_, listener) => {
      // const fullPath = `${withoutTrailingSlash(listener.url)}${path}`
      // logger.info(`Storybook: ${chalk.underline.yellow(fullPath)}`)
      if (nuxt.options.dev) {
        const wrap = logger.create({ level: LogLevel.Fatal })
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
