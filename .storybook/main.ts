import { buildNuxt, loadNuxt, tryUseNuxt } from '@nuxt/kit'
import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  // Need to specify stories as workaround for https://github.com/storybookjs/storybook/issues/20761
  stories: ['../components/*.stories.ts'],
  core: {
    disableTelemetry: true,
    //renderer: '@storybook/html',
  },
  framework: {
    name: '@storybook/vue3-vite',
    //name: 'storybook-nuxt',
    options: {
      builder: {
        viteConfigPath: '.storybook/viteConfig.js',
      },
    },
  },
  async viteFinal(config) {
    return (await startNuxtAndGetViteConfig()).viteConfig
    //return mergeConfig(, config)
  },
}

// https://github.com/nuxt/nuxt/issues/14534
// From: https://github.com/danielroe/nuxt-vitest/blob/main/packages/nuxt-vitest/src/config.ts
async function startNuxtAndGetViteConfig(rootDir = process.cwd()) {
  // TODO: Need better handling if Nuxt is already running
  const nuxt =
    tryUseNuxt() ||
    (await loadNuxt({
      cwd: rootDir,
      dev: false,
      overrides: {
        ssr: false,
        app: {
          rootId: 'nuxt-test',
        },
      },
    }))

  const promise = new Promise<{ nuxt; viteConfig }>((resolve, reject) => {
    nuxt.hook('vite:extendConfig', (viteConfig, { isClient }) => {
      if (isClient) {
        resolve({ nuxt, viteConfig })
        //throw new Error('_stop_')
      }
    })

    buildNuxt(nuxt).catch((err) => {
      if (!err.toString().includes('_stop_')) {
        reject(err)
      }
    })
  }) //.finally(() => nuxt.close())

  return promise
}

export default config
