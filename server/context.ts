import type { H3ContextFunctionArgument } from '@as-integrations/h3'
import type { User } from '@prisma/client'
import type { Session } from 'lucia'
import { resolve } from '~/server/tsyringe'

export interface Context {
  /**
   * Returns the currently logged in user or null if no user is logged in.
   */
  getUser: () => Promise<User | null>
  /**
   * Writes the given session to the response (e.g. sets the session cookie).
   * If the session is null, the session information is removed from the response, which effectively logs the user out.
   */
  setSession: (session: Session | null) => void
}

export function buildContext({
  event,
}: H3ContextFunctionArgument): Promise<Context> {
  const authHandler = resolve('AuthService').createAuthContext(event)
  return Promise.resolve({
    getUser: async () => {
      // Validate internally caches the result, so we don't need to cache it here
      const session = await authHandler.validate()
      return session?.user ?? null
    },
    setSession: (session) => {
      authHandler.setSession(session)
    },
  })
}
