import type { UserSession } from '#auth-utils'
import type { H3Event, SessionConfig } from 'h3'
import { resolve } from '../tsyringe'

let sessionConfig: SessionConfig | null = null
function _useSession(event: H3Event) {
  if (!sessionConfig) {
    const runtimeConfig = useRuntimeConfig(event)
    // @ts-expect-error some mismatch in cookie type definitions
    sessionConfig = runtimeConfig.session
  }
  // @ts-expect-error sessionConfig is not null here
  return useSession<UserSession>(event, sessionConfig)
}

export default defineEventHandler(async (event) => {
  try {
    const authHandler = resolve('AuthService')
    
    // Try to use session, but handle crypto/session errors during prerender
    let session
    try {
      session = await _useSession(event)
    } catch (sessionError) {
      // Skip session validation if session crypto operations fail during prerender
      if (sessionError.message.includes('crypto subtle is not available') ||
          sessionError.message.includes('Password string too short')) {
        return // Skip session validation during prerender
      }
      throw sessionError
    }
    
    // session.id is not a good way to check if there is a session as it will always be set by h3 (except if one calls clearSession)
    // use session.data instead, with the convention that if it is an empty object, there is no session
    if (session.id && Object.keys(session.data).length !== 0) {
      try {
        // Check if session is valid
        await authHandler.refreshSession(session)
        // TODO: This would exposes the "server" info to the client
        // await session.update((data) => defu({ server: info }, data))
      } catch (error) {
        // Clear session if validation fails
        await session.clear()
      }
    }
  } catch (error) {
    // If dependencies can't be resolved (e.g., during prerender when Prisma is not available), skip session validation
    if (error.message.includes('Prisma client not available during prerender')) {
      return // Skip session validation during prerender
    }
    throw error // Re-throw other errors
  }
})
