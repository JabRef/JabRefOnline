import { setup } from '@css-render/vue3-ssr'
import { GlobalThemeOverrides } from 'naive-ui'
import colors from 'tailwindcss/colors'
import { Plugin } from 'vue'

type ConfigProviderOptions = {
  themeOverrides?: GlobalThemeOverrides
}

// Naive does (and will) not provide a vue plugin, so we implement a simple one
// https://github.com/tusen-ai/naive-ui/issues/3700
const plugin: Plugin = {
  install: (app, options: ConfigProviderOptions) => {
    app.provide('n-config-provider', {
      mergedThemeHashRef: computed(() => ''),
      mergedBreakpointsRef: computed(() => undefined),
      mergedRtlRef: computed(() => undefined),
      mergedIconsRef: computed(() => undefined),
      mergedComponentPropsRef: computed(() => undefined),
      mergedBorderedRef: computed(() => undefined),
      mergedNamespaceRef: computed(() => undefined),
      mergedClsPrefixRef: computed(() => undefined),
      mergedLocaleRef: computed(() => undefined),
      mergedDateLocaleRef: computed(() => undefined),
      mergedHljsRef: computed(() => undefined),
      mergedThemeRef: computed(() => undefined),
      mergedThemeOverridesRef: computed(() => options.themeOverrides),
      inlineThemeDisabled: false,
      preflightStyleDisabled: false,
    })
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) {
    const { collect } = setup(nuxtApp.vueApp)
    const originalRenderMeta = nuxtApp.ssrContext?.renderMeta
    // @ts-expect-error: copy-pasted from https://github.com/07akioni/naive-ui-nuxt-demo/blob/main/plugins/naive-ui.ts
    nuxtApp.ssrContext = nuxtApp.ssrContext || {}
    // @ts-expect-error: copy-pasted from https://github.com/07akioni/naive-ui-nuxt-demo/blob/main/plugins/naive-ui.ts
    nuxtApp.ssrContext.renderMeta = () => {
      if (!originalRenderMeta) {
        return {
          headTags: collect(),
        }
      }
      const originalMeta = originalRenderMeta()
      if ('then' in originalMeta) {
        return originalMeta.then((resolvedOriginalMeta) => {
          return {
            ...resolvedOriginalMeta,
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            headTags: resolvedOriginalMeta.headTags + collect(),
          }
        })
      } else {
        return {
          ...originalMeta,
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          headTags: originalMeta.headTags + collect(),
        }
      }
    }
  }

  // Add customization
  nuxtApp.vueApp.use(plugin, {
    themeOverrides: {
      common: {
        primaryColor: colors.indigo[700],
        primaryColorHover: colors.indigo[500],
        primaryColorPressed: colors.indigo[900],
        primaryColorSuppl: colors.indigo[500],
      },
    },
  })
})
