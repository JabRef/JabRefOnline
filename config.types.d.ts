import { Config } from './config'

interface NuxtIconModuleOptions {
  size?: string | false
  class?: string
  aliases?: { [alias: string]: string }
}

declare module '@nuxt/schema' {
  // Provide custom type information for config, overriding the default empty types.
  // TODO: Remove this as soon as https://github.com/nuxt/framework/issues/1785 is resolved.
  // eslint-disable-next-line @typescript-eslint/no-empty-interface -- Don't know how to reexport in a module declariation
  interface RuntimeConfig extends Config {}

  // Workaround for bug in icon modules
  // TODO: Remove this as soon as https://github.com/nuxt-modules/icon/pull/63 is merged/resolved.
  interface AppConfig {
    nuxtIcon?: NuxtIconModuleOptions
  }
}

// Provide custom type information for page metadata
// As described at https://v3.nuxtjs.org/guide/directory-structure/pages#typing-custom-metadata
declare module '#app' {
  interface PageMeta {
    requiresAuth?: boolean
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {}
