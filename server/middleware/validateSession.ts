import type { UserSession } from '#auth-utils'
import type { H3Event, SessionConfig } from 'h3'
import { resolve } from '../tsyringe'

let sessionConfig: SessionConfig | null = null
function _useSession(event: H3Event) {
  if (!sessionConfig) {
    const runtimeConfig = useRuntimeConfig(event)
    sessionConfig = runtimeConfig.session
  }
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
      await authHandler.refreshSession(session)
      // TODO: This would exposes the "server" info to the client
      // await session.update((data) => defu({ server: info }, data))
    } catch {
      // Clear session
      await session.clear()
    }
  }
})
