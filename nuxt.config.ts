import { defineNuxtConfig } from '@nuxt/bridge'
import typescript from 'rollup-plugin-typescript2'
import { constructPrivateConfig } from './config'

export default defineNuxtConfig({
  /*
   ** Enable static site generation
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',

  bridge: {
    // Use Vite instead of Webpack
    vite: true,
    // Disable legacy composition API support (we no longer need this)
    capi: {
      legacy: false,
    },
  },

  vite: {
    // @ts-ignore: no typing information, but it is a workaround anyway
    ssr: {
      // TODO: Remove these once new versions of the libraries are used that support esm
      noExternal: ['@vue/devtools-api', 'pinia'],
    },
  },

  alias: {
    // TODO: Remove this as soon as we only use tslib >= 2.0.0 (old version are not compatible with esm)
    tslib: 'tslib/tslib.es6.js',
  },

  nitro: {
    hooks: {
      'nitro:rollup:before'(ctx) {
        // Needed for emitting decorator metadata (which is not supported by esbuild)
        ctx.rollupConfig?.plugins?.unshift(typescript())
      },
    },
    // Prevent 'reflect-metadata' from being treeshaked (since we don't explicitly use the import it would otherwise be removed)
    moduleSideEffects: ['reflect-metadata'],
  },

  /*
   ** Enable server-side rendering (needed for 'static' target)
   ** See https://nuxtjs.org/docs/configuration-glossary/configuration-ssr
   */
  ssr: true,

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Global CSS
   */
  css: [
    // FontAwesome support
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],

  /*
   * Front-end plugins to load before mounting the App
   * https://nuxtjs.org/guide/plugins
   */
  plugins: [
    // FontAwesome support
    '~/plugins/fontawesome.ts',
    // Tailwind CSS support
    '~/plugins/tailwind.ts',
    // Graphql support
    '~/plugins/apollo.ts',
    // Custom Vue directives
    '~/plugins/vue.directives.ts',
    // Authentication check
    '~/plugins/authenticated.ts',
  ],

  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,

  // TODO: Reenable config viewer as soon as https://github.com/nuxt/framework/issues/865 is fixed.
  tailwindcss: {
    viewer: false,
    configPath: '~/tailwind.config.cjs',
  },

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // Allows more control where component's templates are rendered
    // https://portal-vue.linusb.org/
    'portal-vue/nuxt',
    // Use Pinia for state management
    '@pinia/nuxt',
    // Make route meta information available to plugins
    'nuxt-route-meta',
  ],

  /*
   * Front-end Nuxt.js modules
   * See https://nuxtjs.org/docs/2.x/directory-structure/modules
   */
  modules: [],

  /*
   ** Server Middleware
   */
  serverMiddleware: [{ path: '/api', handler: '~/api' }],

  /*
   ** Restarts the server when dependencies change.
   */
  watch: ['api/**/*.graphql'],

  /*
   ** For deployment you might want to edit host and port
   */
  // server: {
  //  port: 8000, // default: 3000
  //  host: '0.0.0.0' // default: localhost
  // },

  /*
   ** Server-side configuration
   ** See https://nuxtjs.org/docs/directory-structure/nuxt-config#runtimeconfig
   */
  privateRuntimeConfig: constructPrivateConfig(),

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    // TODO: Remove these once new versions of the libraries are used that support esm
    transpile: [
      // TODO: Remove once apollo/client/utilities supports esm (https://github.com/apollographql/apollo-client/issues/9008)
      '@apollo/client',
      // TODO: Remove this as soon as we only use tslib >= 2.0.0 (old version are not compatible with esm)
      'tslib',
      // TODO: Remove this as soon as ts-invariant supports esm (https://github.com/apollographql/invariant-packages/issues/227)
      'ts-invariant/process',
      // TODO: Remove this as soon as vue-property-decorator supports esm (https://github.com/kaorun343/vue-property-decorator/issues/385)
      'vue-property-decorator',
      // TODO: Remove this as soon as vue-tailwind supports esm (https://github.com/alfonsobries/vue-tailwind/issues/236)
      'vue-tailwind',
    ],
  },

  /**
   * Storybook integration with Nuxt
   * See https://storybook.nuxtjs.org/
   */
  storybook: {},
})
