import { defineNuxtConfig } from 'nuxt'
import typescript from 'rollup-plugin-typescript2'
import { constructConfig } from './config'

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
      noExternal: ['@vue/devtools-api'],
    },
  },

  alias: {
    // TODO: Remove this as soon as we only use tslib >= 2.0.0 (old version are not compatible with esm)
    tslib: 'tslib/tslib.es6.js',
  },

  nitro: {
    hooks: {
      'rollup:before'(ctx) {
        // Needed for emitting decorator metadata (which is not supported by esbuild)
        ctx.options.rollupConfig?.plugins?.unshift(typescript())
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
  meta: {
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

  // TODO: Reenable config viewer as soon as https://github.com/nuxt/framework/issues/865 is fixed.
  tailwindcss: {
    viewer: false,
    configPath: '~/tailwind.config.cjs',
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // Use Pinia for state management
    '@pinia/nuxt',
  ],

  /*
   ** Restarts the server when dependencies change.
   */
  watch: ['server/**/*.graphql'],

  /*
   ** For deployment you might want to edit host and port
   */
  // server: {
  //  port: 8000, // default: 3000
  //  host: '0.0.0.0' // default: localhost
  // },

  /*
   ** Client and server-side configuration
   ** See https://nuxtjs.org/docs/directory-structure/nuxt-config#runtimeconfig
   */
  runtimeConfig: constructConfig(),

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    // TODO: Remove these once new versions of the libraries are used that support esm
    transpile: [
      // TODO: Remove this as soon as we only use tslib >= 2.0.0 (old version are not compatible with esm)
      'tslib',
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
