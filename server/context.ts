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
  setSession: (session: UserSession | null) => Promise<void>
}

let sessionConfig: SessionConfig | null = null
function _useSession(event: H3Event) {
  if (!sessionConfig) {
    const runtimeConfig = useRuntimeConfig(event)
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- false positive
    const envSessionPassword = `${runtimeConfig.nitro?.envPrefix ?? 'NUXT_'}SESSION_PASSWORD`

    // @ts-expect-error hard to define with defu
    sessionConfig = defu(
      { password: process.env[envSessionPassword] },
      runtimeConfig.session,
    )
  }
  // @ts-expect-error sessionConfig is not null here
  return useSession<UserSession>(event, sessionConfig)
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
        await setUserSession(event, session, {
          // Session completely expires after half a year
          maxAge: 0.5 * 31556952 * 1000,
          cookie: {
            // Blocks sending a cookie in a cross-origin request, protects somewhat against CORS attacks
            sameSite: 'strict',
          },
        })
      }
    },
  })
}
