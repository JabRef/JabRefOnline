import { constructConfig } from './config'

export default defineNuxtConfig({
  extends: [
    // Preset for configuring SEO
    // https://github.com/harlan-zw/nuxt-seo-kit
    'nuxt-seo-kit',
  ],

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
      // Needed for storybook support (otherwise the file is not created during nuxi generate)
      routes: ['/_storybook/external-iframe'],
    },
    esbuild: {
      options: {
        tsconfigRaw: {
          compilerOptions: {
            // Enable decorators, workaround for https://github.com/unjs/nitro/issues/1380
            experimentalDecorators: true,
          },
        },
      },
    },
  },

  experimental: {
    // Full typed routing
    typedPages: true,
  },

  vue: {
    // Add support for vue runtime compiler (needed to render stories in storybook)
    runtimeCompiler: true,
  },

  /*
   ** Headers of the page
   ** See https://v3.nuxtjs.org/getting-started/seo-meta
   */
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/img/JabRef-icon-16.png',
          sizes: '16x16',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/img/JabRef-icon-20.png',
          sizes: '20x20',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/img/JabRef-icon-32.png',
          sizes: '32x32',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/img/JabRef-icon-40.png',
          sizes: '40x40',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/img/JabRef-icon-48.png',
          sizes: '48x48',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/img/JabRef-icon-64.png',
          sizes: '64x64',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/img/JabRef-icon-128.png',
          sizes: '128x128',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/img/JabRef-icon-256.png',
          sizes: '256x256',
        },
      ],
    },
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // Add support for naive-ui
    '@huntersofbook/naive-ui-nuxt',
    // Use Pinia for state management
    '@pinia/nuxt',
    // Add server-side graphql support
    'nuxt-graphql-server',
    // Add support for writing content in markdown
    // https://content.nuxtjs.org/
    '@nuxt/content',
    // Add support for native vue stories
    // https://github.com/tobiasdiez/storybook-vue-addon
    'storybook-vue-addon/nuxt',
    // Devtools support
    // https://github.com/nuxt/devtools
    '@nuxt/devtools',
    // Add support for different icons from iconify
    'nuxt-icon',
    // Add some auto-imports for vee-validate
    '@vee-validate/nuxt',
    // Vitest integration
    // https://github.com/danielroe/nuxt-vitest
    'nuxt-vitest',
  ],

  /*
   ** Client and server-side configuration
   ** See https://nuxt.com/docs/guide/going-further/runtime-config
   */
  runtimeConfig: constructConfig(),

  /**
   * Add redirects, mostly for backwards compatibility
   */
  routeRules: {
    '/faq': { redirect: 'https://docs.jabref.org/faq' },
    '/paypal': { redirect: '/donations' },
    '/donations': {
      redirect: 'https://github.com/JabRef/jabref/wiki/Donations/',
    },
    '/gsoc/**': { redirect: '/codeprojects/gsoc' },
    '/bluehat2022': { redirect: '/codeprojects/bluehat2022' },
    '/surveys/': { redirect: '/surveys/2015' },
    '/': { prerender: true },
    // TODO: Workaround for https://github.com/unjs/nitro/issues/1402
    '/download': { prerender: false },
  },

  /**
   * Storybook integration with Nuxt
   * See https://storybook.nuxtjs.org/
   * TODO: See if we need this, maybe remove
   */
  // storybook: {},

  tailwindcss: {
    // Expose config so that we can use it in the vscode extension
    exposeConfig: true,
  },

  /**
   * GraphQL server config
   * See https://github.com/tobiasdiez/nuxt-graphql-server
   */
  graphqlServer: {
    codegen: {
      mapperTypeSuffix: 'Model',
      contextType: './context#Context',
      mappers: {
        User: '@prisma/client/index.d#User',
        Document: './documents/user.document.service#UserDocument',
        JournalArticle: './documents/user.document.service#UserDocument',
        ProceedingsArticle: './documents/user.document.service#UserDocument',
        Thesis: './documents/user.document.service#UserDocument',
        Other: './documents/user.document.service#UserDocument',
        Group: './groups/resolvers#GroupMaybeResolved',
      },
      scalars: {
        Date: 'string',
        DateTime: 'Date',
        EmailAddress: 'string',
      },
    },
  },

  content: {
    markdown: {
      // Don't automatically print h2-h4 headings as links
      anchorLinks: false,
    },
  },

  /**
   * Naive UI configuration
   */
  naiveUI: {
    themeOverrides: {
      common: {
        primaryColor: '#6072A7',
        primaryColorHover: '#4F5F8F',
        primaryColorPressed: '#3B476B',
        primaryColorSuppl: '#4F5F8F',
      },
    },
  },

  /**
   * SEO configuration
   * https://github.com/harlan-zw/nuxt-seo-kit
   */
  site: {
    // Hide information message during startup
    splash: false,
    siteUrl: 'https://www.jabref.org/',
    siteName: 'JabRef',
    siteDescription:
      'A free reference manager that helps you to discover, collect, organize and cite your scholarly literature and research in an efficient way.',
  },

  /**
   * Management of robots crawling
   * https://github.com/harlan-zw/nuxt-simple-robots
   */
  robots: {
    // Allow crawling of all pages
    indexable: true,
  },

  vite: {
    // Workaround for https://github.com/browserify/node-util/pull/62
    define: {
      'process.env': {},
    },
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

      // Without this, vite would handle cors in dev mode, which would lead to different behavior in dev and prod
      cors: {
        preflightContinue: true,
      },
    },
  },
})
