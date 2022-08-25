import { Config } from './config'

// Provide custom type information for config, overriding the default empty types.
// TODO: Remove this as soon as https://github.com/nuxt/framework/issues/1785 is resolved.
declare module '@nuxt/schema' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface -- Don't know how to reexport in a module declariation
  interface RuntimeConfig extends Config {}
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
