import { defineNuxtConfig } from 'nuxt'
import { constructConfig } from './config'

export default defineNuxtConfig({
  /*
   ** Add alias for library imports
   ** https://v3.nuxtjs.org/guide/going-further/esm#aliasing-libraries
   */
  alias: {
    // Support `import 'global'` used by storybook
    // TODO: Remove this workaround once nuxt provides a proper polyfill for globals https://github.com/nuxt/framework/issues/1922
    global: 'global.ts',
  },

  nitro: {
    // Prevent 'reflect-metadata' from being treeshaked (since we don't explicitly use the import it would otherwise be removed)
    moduleSideEffects: ['reflect-metadata'],
    prerender: {
      // Needed for storybook support
      routes: ['/_storybook/external-iframe'],
    },
  },

  /*
   ** Disable server-side rendering for now
   ** See https://v3.nuxtjs.org/api/configuration/nuxt.config#ssr
   ** and https://v3.nuxtjs.org/guide/concepts/rendering for a big-picture overview.
   */
  ssr: false,

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

  /*
   ** Nuxt.js modules
   */
  modules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // Use Pinia for state management
    '@pinia/nuxt',
    // Add storybook support
    './modules/storybook',
    // Add graphql support
    './modules/graphql',
    // Add vue runtime compiler as temporary workaround for https://github.com/nuxt/framework/issues/4661
    'nuxt3-runtime-compiler-module',
    // Add support for writing content in markdown
    // https://content.nuxtjs.org/
    '@nuxt/content',
  ],

  /*
   ** Restarts the server when dependencies change.
   */
  watch: ['server/**/*.graphql'],

  /*
   ** Client and server-side configuration
   ** See https://v3.nuxtjs.org/guide/features/runtime-config
   */
  runtimeConfig: constructConfig(),

  /**
   * Add global Graphql server endpoint
   * See https://v3.nuxtjs.org/api/configuration/nuxt.config#serverhandlers
   */
  serverHandlers: [
    { route: '/api', handler: '~/server/index.ts' },
    { route: '/_admin/**', handler: '~/server/admin.ts' },
  ],

  /**
   * Storybook integration with Nuxt
   * See https://storybook.nuxtjs.org/
   */
  storybook: {},

  vite: {
    server: {
      // Configure vite for HMR with Gitpod
      // Taken from https://github.com/vitejs/vite/issues/1653#issuecomment-1079322770
      hmr: process.env.GITPOD_WORKSPACE_URL
        ? {
            // Gitpod is served over https, so we need to use wss as well
            protocol: 'wss',
            host: `3000-${process.env.GITPOD_WORKSPACE_ID || ''}.${
              process.env.GITPOD_WORKSPACE_CLUSTER_HOST || ''
            }`,
            port: 443,
          }
        : true,

      cors: {
        preflightContinue: true,
      },
    },
  },
})
