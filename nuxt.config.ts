import { defineNuxtConfig } from 'nuxt'
import { loadSchemaSync as loadGraphqlSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import type { NitroConfig } from 'nitropack'
import { printSchema } from 'graphql'
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
    // Add storybook support
    './modules/storybook',
    // Add vue runtime compiler as temporary workaround for https://github.com/nuxt/framework/issues/4661
    'nuxt3-runtime-compiler-module',
  ],

  /*
   ** Restarts the server when dependencies change.
   */
  watch: ['server/**/*.graphql'],

  /*
   ** Client and server-side configuration
   ** See https://nuxtjs.org/docs/directory-structure/nuxt-config#runtimeconfig
   */
  runtimeConfig: constructConfig(),

  /**
   * Add global Graphql server endpoint
   * See https://v3.nuxtjs.org/api/configuration/nuxt.config#serverhandlers
   */
  serverHandlers: [{ route: '/api', handler: '~/server/index.ts' }],

  /**
   * Storybook integration with Nuxt
   * See https://storybook.nuxtjs.org/
   */
  storybook: {},

  /**
   * Register custom (build) event listener
   * See https://v3.nuxtjs.org/api/configuration/nuxt.config#hooks
   */
  hooks: {
    'nitro:config'(nitroConfig: NitroConfig) {
      // Register #graphql/schema virtual module
      nitroConfig.virtual = nitroConfig.virtual || {}
      nitroConfig.virtual['#graphql/schema'] = () => {
        const schema = loadGraphqlSchemaSync('./server/**/*.graphql', {
          loaders: [new GraphQLFileLoader()],
        })
        return `
          import { loadSchemaSync } from '@graphql-tools/load'
          import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
          export const schema = loadSchemaSync(\`${printSchema(schema)}\`, {
            loaders: [new GraphQLFileLoader()]
          })
        `
      }
    },
  },
})
