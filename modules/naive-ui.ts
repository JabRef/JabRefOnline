import { defineNuxtModule } from '@nuxt/kit'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default defineNuxtModule({
  setup(options, nuxt) {
    // Fix build issues
    if (nuxt.options.dev) {
      nuxt.options.build.transpile.push('@juggle/resize-observer')
      nuxt.options.vite.optimizeDeps?.include?.push(
        'naive-ui',
        'vueuc',
        'date-fns-tz/esm/formatInTimeZone'
      )
    } else {
      nuxt.options.build.transpile.push(
        'naive-ui',
        'vueuc',
        '@css-render/vue3-ssr',
        '@juggle/resize-observer'
      )
    }

    // Make sure the css is inserted last (for compatibility with tailwind)
    // This doesn't seem to work
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    nuxt.options.head.meta = [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      ...nuxt.options.head.meta,
      { name: 'naive-ui-style' },
    ]

    // Automatically register all components
    // This is a workaround as long as nuxt doesn't support component resolvers: https://github.com/nuxt/framework/issues/487
    nuxt.options.vite.plugins = nuxt.options.vite.plugins ?? []
    nuxt.options.vite.plugins.push(
      Components({
        resolvers: [NaiveUiResolver()],
        // This sadly doesn't work, one still needs to add "naive-ui/volar" in tsconfig.json
        dts: '.nuxt/naive-ui-components.d.ts',
      })
    )
  },
})
