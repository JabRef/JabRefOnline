import { buildNuxt, loadNuxt, tryUseNuxt } from '@nuxt/kit'
import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  // Need to specify stories as workaround for https://github.com/storybookjs/storybook/issues/20761
  stories: ['../components/*.stories.ts'],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  async viteFinal(config) {
    const nuxtViteConfig = (await startNuxtAndGetViteConfig()).viteConfig
    // Need to remove the vue plugin as it conflicts with the one configured by nuxt
    // it would be better to provide nuxt's config as the initial config to storybook,
    // but this is not yet possible https://github.com/storybookjs/storybook/issues/20817
    config.plugins = config.plugins.filter((plugin) => {
      if (
        plugin !== null &&
        typeof plugin === 'object' &&
        'name' in plugin &&
        plugin.name === 'vite:vue'
      ) {
        return false
      }
      return true
    })
    return mergeConfig(
      {
        resolve: nuxtViteConfig.resolve,
        optimizeDeps: nuxtViteConfig.optimizeDeps,
        plugins: nuxtViteConfig.plugins,
        define: nuxtViteConfig.define,
      },
      config
    )
  },
}

// https://github.com/nuxt/nuxt/issues/14534
// From: https://github.com/danielroe/nuxt-vitest/blob/main/packages/nuxt-vitest/src/config.ts
async function startNuxtAndGetViteConfig(rootDir = process.cwd()) {
  let nuxt = tryUseNuxt()
  let nuxtAlreadyRunnnig = true
  if (!nuxt) {
    nuxtAlreadyRunnnig = false
    nuxt = await loadNuxt({
      cwd: rootDir,
      dev: false,
      overrides: {
        ssr: false,
        app: {
          rootId: 'nuxt-test',
        },
      },
    })
  }

  const promise = new Promise<{ nuxt; viteConfig }>((resolve, reject) => {
    nuxt.hook('vite:extendConfig', (viteConfig, { isClient }) => {
      if (isClient) {
        resolve({ nuxt, viteConfig })
        if (!nuxtAlreadyRunnnig) {
          throw new Error('_stop_')
        }
      }
    })

    // TODO: Need better handling if Nuxt is already running
    // we don't really want to build nuxt again,
    // or at least shutdown the second build after vite:extendConfig is called
    buildNuxt(nuxt).catch((err) => {
      if (!err.toString().includes('_stop_')) {
        reject(err)
      }
    })
  }).finally(() => {
    if (!nuxtAlreadyRunnnig) {
      nuxt.close()
    }
  })

  return promise
}

export default config
