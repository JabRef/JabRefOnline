import forms from '@tailwindcss/forms'

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
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Global CSS
  */
  css: [
    // FontAwesome support
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    // FontAwesome support
    '~/plugins/fontawesome.ts'
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
    //'nuxt-vite',
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // Allows more control where component's templates are rendered
    // https://portal-vue.linusb.org/
    'portal-vue/nuxt',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Graphql support on the client side
    '~/plugins/apollo.module.ts'
  ],

  /*
  ** Server Middleware
  */
  serverMiddleware: {
    '/api': '~/api'
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
  build: {
  },

  tailwindcss: {
    config: {
      plugins: [
        forms
      ]
    }
  }
}
