import type { UserSession } from '#auth-utils'
import { defu } from 'defu'
import type { H3Event, SessionConfig } from 'h3'
import { resolve } from '../tsyringe'

let sessionConfig: SessionConfig | null = null
function _useSession(event: H3Event) {
  if (!sessionConfig) {
    const runtimeConfig = useRuntimeConfig(event)
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- false positive
    const envSessionPassword = `${runtimeConfig.nitro?.envPrefix ?? 'NUXT_'}SESSION_PASSWORD`
    console.log('envSessionPassword', envSessionPassword)
    console.log('process.env', process.env)

    // @ts-expect-error hard to define with defu
    sessionConfig = defu(
      { password: process.env[envSessionPassword] },
      runtimeConfig.session,
    )
  }
  // @ts-expect-error sessionConfig is not null here
  return useSession<UserSession>(event, sessionConfig)
}

export default defineEventHandler(async (event) => {
  const authHandler = resolve('AuthService')
  const session = await _useSession(event)
  // session.id is not a good way to check if there is a session as it will always be set by h3 (except if one calls clearSession)
  // use session.data instead, with the convention that if it is an empty object, there is no session
  if (session.id && Object.keys(session.data).length !== 0) {
    try {
      // Check if session is valid
      const info = await authHandler.refreshSession(session)
      // TODO: This exposes the "server" info to the client, right?
      await session.update((data) => defu({ server: info }, data))
    } catch {
      // Clear session
      await session.clear()
    }
  }
})
