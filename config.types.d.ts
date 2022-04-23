import { Config } from './config'

// Provide custom type information for config, overriding the default empty types.
// TODO: Remove this as soon as https://github.com/nuxt/framework/issues/1785 is resolved.
declare module '@nuxt/schema' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface -- Don't know how to reexport in a module declariation
  interface RuntimeConfig extends Config {}
}
export {}
