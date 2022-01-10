import { Environment } from './config'

// Provide custom type information for config, overriding the default empty types.
// TODO: Remove this as soon as https://github.com/nuxt/framework/issues/1785 is resolved.
declare module '@nuxt/schema' {
  interface PrivateRuntimeConfig {
    redis: {
      port: number
      host: string
      password: string
    }
    session: {
      primarySecret: string
      secondarySecret: string
    }
  }

  interface PublicRuntimeConfig {
    environment: Environment
  }
}
export {}
