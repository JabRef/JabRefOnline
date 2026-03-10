import type { User, UserSession } from '#auth-utils'
import type { H3ContextFunctionArgument } from '@as-integrations/h3'
import { defu } from 'defu'
import type { H3Event, SessionConfig } from 'h3'

export interface Context {
  /**
   * Returns the current (raw) session or initializes a new session if no session is present.
   */
  getOrInitSession: () => Promise<{
    readonly id: string | undefined
    readonly data: UserSession
    update: (
      update:
        | Partial<UserSession>
        | ((oldData: UserSession) => Partial<UserSession> | undefined),
    ) => Promise<any>
    clear: () => Promise<any>
  }>
  /**
   * Returns the currently logged in user or null if no user is logged in.
   */
  getUser: () => Promise<User | null>
  /**
   * Writes the given session to the response (e.g. sets the session cookie).
   * If the session is null, the session information is removed from the response, which effectively logs the user out.
   */
  setSession: (session: Omit<UserSession, 'id'> | null) => Promise<void>
}

let sessionConfig: SessionConfig | null = null
function _useSession(event: H3Event, config: Partial<SessionConfig> = {}) {
  if (!sessionConfig) {
    const runtimeConfig = useRuntimeConfig(event)
    sessionConfig = runtimeConfig.session
  }
  const finalConfig = defu(config, sessionConfig) as SessionConfig
  return useSession<UserSession>(event, finalConfig)
}

export function buildContext({
  event,
}: H3ContextFunctionArgument): Promise<Context> {
  return Promise.resolve({
    getOrInitSession: async () => {
      return _useSession(event)
    },
    getUser: async () => {
      return (await getUserSession(event)).user ?? null
    },
    setSession: async (session) => {
      if (session === null) {
        await clearUserSession(event)
      } else {
        // TODO: Handle this properly (i.e. don't expose to client but still have it available on the server)
        delete session.server

        // This is all very hacky
        // h3 currently doesn't deduplicate cookies. So just calling "setUserSession"
        // creates actually 4 cookies...
        // We clear the cookie in between, and then manually set the session data
        // TODO: Remove this workaround once h3 v2 comes out
        const rawSession = await _useSession(event, {
          // Session completely expires after half a year
          maxAge: 0.5 * 31556952 * 1000,
          cookie: {
            // Blocks sending a cookie in a cross-origin request, protects somewhat against CORS attacks
            sameSite: 'strict',
          },
        })
        // This actually clears all cookies! Probably not what we want
        setResponseHeader(event, 'Set-Cookie', '')
        await rawSession.update(() => session)
      }
    },
  })
}
