import forms from '@tailwindcss/forms'
import jiti from 'jiti'
import { transformSync } from '@babel/core'

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',

  /*
   ** Disable server-side rendering
   */
  ssr: false,

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
  ],

  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // TODO: Play again with vite once it is more stable
    // 'nuxt-vite',
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // Allows more control where component's templates are rendered
    // https://portal-vue.linusb.org/
    'portal-vue/nuxt',
    // Enables Vue 3 composition API
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api',
  ],

  /*
   * Front-end Nuxt.js modules
   * See https://nuxtjs.org/docs/2.x/directory-structure/modules
   */
  modules: [],

  /*
   ** Server Middleware
   */
  serverMiddleware: {
    '/api': '~/api',
  },

  /*
   ** For deployment you might want to edit host and port
   */
  // server: {
  //  port: 8000, // default: 3000
  //  host: '0.0.0.0' // default: localhost
  // },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},

  tailwindcss: {
    config: {
      plugins: [forms],
    },
  },

  // Workaround for https://github.com/nuxt/typescript/issues/494
  createRequire: (jsFileName: string) => {
    return jiti(jsFileName, {
      debug: false,
      legacy: true,
      transform(opts: any): any {
        const _opts = {
          babelrc: false,
          configFile: false,
          compact: false,
          retainLines:
            typeof opts.retainLines === 'boolean' ? opts.retainLines : true,
          filename: '',
          cwd: '/',
          plugins: [
            [
              require('@babel/plugin-transform-modules-commonjs'),
              { allowTopLevelThis: true },
            ],
            [require('babel-plugin-transform-typescript-metadata')],
            [require('babel-plugin-dynamic-import-node'), { noInterop: true }],
            [require('babel-plugin-transform-import-meta')],
            [require('@babel/plugin-proposal-decorators'), { legacy: true }],
            [require('@babel/plugin-syntax-class-properties'), { loose: true }],
          ],
        }

        if (opts.ts) {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          _opts.plugins!.push(require('@babel/plugin-transform-typescript'))
        }

        if (opts.legacy) {
          _opts.plugins!.push(
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require('@babel/plugin-proposal-nullish-coalescing-operator')
          )
          _opts.plugins!.push(
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require('@babel/plugin-proposal-optional-chaining')
          )
        }

        try {
          return {
            code: transformSync(opts.source, _opts)?.code || '',
          }
        } catch (err) {
          return {
            error: err,
            code:
              'exports.__JITI_ERROR__ = ' +
              JSON.stringify({
                filename: opts.filename,
                line: err.loc?.line || 0,
                column: err.loc?.column || 0,
                code: err.code
                  ?.replace('BABEL_', '')
                  .replace('PARSE_ERROR', 'ParseError'),
                message: err.message
                  ?.replace('/: ', '')
                  .replace(/\(.+\)\s*$/, ''),
              }),
          }
        }
      },
    })
  },
}
