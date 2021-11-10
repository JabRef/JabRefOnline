import { Environment } from './config'

declare module '@nuxt/kit' {
  interface PrivateRuntimeConfig {
    environment: Environment
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
}
export {}
