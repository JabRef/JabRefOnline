import { transformSync } from '@babel/core'
import { NuxtConfig } from '@nuxt/types'
import jiti from 'jiti'

const config: NuxtConfig = {
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
    // Custom Vue directives
    '~/plugins/vue.directives.ts',
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
    // Use Vite instead of Webpack during development
    // https://vite.nuxtjs.org/
    'nuxt-vite',
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // Allows more control where component's templates are rendered
    // https://portal-vue.linusb.org/
    'portal-vue/nuxt',
    // Enables Vue 3 composition API
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module',
    // Use postcss v8
    '@nuxt/postcss8',
    // Use Pinia for state management
    'pinia/nuxt',
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
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    extend: (config, { isDev, isClient }): void => {
      if (isClient) {
        // Extensions for client bundling
        if (isDev) {
          // Create source maps to enable debugging from VS Code
          config.devtool = 'source-map'
        }
      } else {
        // Extensions for server bundling
        // eslint-disable-next-line no-lonely-if
        if (isDev) {
          // Create source maps to enable debugging from VS Code (needs to be inline)
          config.devtool = 'inline-source-map'
        }
      }

      // @ts-ignore: config.output is not null
      config.output.devtoolModuleFilenameTemplate = (info) => {
        // There are some problems with the source-map support of the vue-loader
        // In particular, there are many different files for each vue file which confuses VS code
        // So we use the workaround https://github.com/vuejs/vue-loader/issues/146#issuecomment-877869882 to only keep the file necessary for debugging
        // while moving all the other files to the ignore folder.
        if (info.resourcePath.endsWith('.vue')) {
          // The <script> block from vue files
          if (
            info.query.startsWith('?vue&type=script') &&
            !info.allLoaders.includes('babel')
          ) {
            return `webpack:///${info.resourcePath}?script${info.hash}`
          }

          // The full vue file
          else if (info.query === '' && info.allLoaders === []) {
            return `webpack:///${info.resourcePath}?render${info.hash}`
          } else {
            // All other files
            return `webpack:///ignore/${info.resourcePath}?${info.hash}`
          }
        } else {
          return `webpack:///${info.resourcePath}?${info.hash}`
        }
      }
    },
  },

  /**
   * Storybook integration with Nuxt
   * See https://storybook.nuxtjs.org/
   */
  storybook: {},

  // Workaround for https://github.com/nuxt/typescript/issues/494
  createRequire: (jsFileName: string) => {
    return jiti(jsFileName, {
      debug: false,
      legacy: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transform(opts: any): any {
        const _opts = {
          babelrc: false,
          configFile: false,
          compact: false,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          retainLines:
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (opts.ts) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          _opts.plugins.push(
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require('@babel/plugin-transform-typescript')
          )
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (opts.legacy) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          _opts.plugins.push(
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require('@babel/plugin-proposal-nullish-coalescing-operator')
          )
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          _opts.plugins.push(
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require('@babel/plugin-proposal-optional-chaining')
          )
        }

        try {
          return {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            code: transformSync(opts.source, _opts)?.code || '',
          }
        } catch (err) {
          return {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            error: err,
            code:
              'exports.__JITI_ERROR__ = ' +
              JSON.stringify({
                // eslint-disable-next-line
                filename: opts.filename,
                // eslint-disable-next-line
                line: err.loc?.line || 0,
                // eslint-disable-next-line
                column: err.loc?.column || 0,
                // eslint-disable-next-line
                code: err.code
                  ?.replace('BABEL_', '')
                  .replace('PARSE_ERROR', 'ParseError'),
                // eslint-disable-next-line
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
export default config
