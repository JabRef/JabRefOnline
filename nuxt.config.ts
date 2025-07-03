import { constructConfig } from './config'

export default defineNuxtConfig({
  /*
   ** Add alias for library imports
   ** https://v3.nuxtjs.org/guide/going-further/esm#aliasing-libraries
   */
  alias: {
    // Support `import 'global'` used by storybook
    // TODO: Remove this workaround once nuxt provides a proper polyfill for globals https://github.com/nuxt/framework/issues/1922
    global: './global.ts',
  },

  /**
   * Pre-render routes at build time by default
   */
  ssr: true,

  nitro: {
    azure: {
      config: {
        globalHeaders: {
          'X-Robots-Tag':
            'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
      },
    },
    // Prevent 'reflect-metadata' and 'json-bigint-patch' from being treeshaked (since we don't explicitly use the import it would otherwise be removed)
    moduleSideEffects: ['reflect-metadata', 'json-bigint-patch'],
    prerender: {
      // Prerender all pages reached from the index page
      crawlLinks: true,
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
    '@bg-dev/nuxt-naiveui',
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
    // Support for end-to-end testing and unit testing (and Vitest integration)
    // https://nuxt.com/docs/getting-started/testing
    '@nuxt/test-utils/module',
    // Preset for configuring SEO
    // https://nuxtseo.com/nuxt-seo
    '@nuxtjs/seo',
    // Add authentication support
    // https://github.com/atinux/nuxt-auth-utils
    'nuxt-auth-utils',
    // Add eslint support
    // https://eslint.nuxt.com
    '@nuxt/eslint',
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
  },

  /**
   * Storybook integration with Nuxt
   * See https://storybook.nuxtjs.org/
   * TODO: See if we need this, maybe remove
   */
  // storybook: {},

  tailwindcss: {
    // Expose config so that we can use it to configure naive ui and in the vscode extension
    exposeConfig: {
      write: true,
    },
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
    renderer: {
      // Don't automatically print h2-h4 headings as links
      // Currently leads to TS errors
      //anchorLinks: false,
    },
  },

  /**
   * SEO configuration
   * https://nuxtseo.com/nuxt-seo/guides/configuring-modules
   */
  // @ts-expect-error: temporary issue
  site: {
    // Hide information message during startup
    splash: false,
    url: 'https://www.jabref.org/',
    name: 'JabRef - Free Reference Manager - Stay on top of your Literature',
    description:
      'A free reference manager that helps you to discover, collect, organize and cite your scholarly literature and research in an efficient way.',
  },

  vite: {
    // Workaround for https://github.com/browserify/node-util/pull/62
    define: {
      'process.env': {},
    },
    optimizeDeps: {
      // Workaround for https://github.com/nuxt/nuxt/issues/27544
      exclude: ['vee-validate'],
    },
    server: {
      // Configure vite for HMR with Gitpod
      // Taken from https://github.com/vitejs/vite/issues/1653#issuecomment-1079322770
      hmr: process.env.GITPOD_WORKSPACE_URL
        ? {
            // Gitpod is served over https, so we need to use wss as well
            protocol: 'wss',
            host: `3000-${process.env.GITPOD_WORKSPACE_ID ?? ''}.${
              process.env.GITPOD_WORKSPACE_CLUSTER_HOST ?? ''
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

  /**
   * Provide compatibility information for Nitro presets, and Nuxt modules
   * https://nuxt.com/docs/api/nuxt-config#compatibilitydate
   */
  compatibilityDate: '2024-07-13',
})
