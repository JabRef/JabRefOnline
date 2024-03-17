import type { H3ContextFunctionArgument } from '@as-integrations/h3'
import type { Session, User } from 'lucia'
import { resolve } from '~/server/tsyringe'

export interface Context {
  /**
   * Returns the currently logged in user or null if the user is not logged in.
   */
  getUser: () => Promise<User | null>

  /**
   * Returns the currently active session or null if the user is not logged in.
   */
  getSession: () => Promise<Session | null>

  /**
   * Returns the id of the currently active session as specified in the request or null if the user is not logged in.
   * This method does not check if the session is valid.
   */
  getSessionId: () => string | null

  /**
   * Writes the given session to the response (e.g. sets the session cookie).
   * If the session is null, the session information is removed from the response, which effectively logs the user out.
   */
  setSession: (session: Session | null) => Promise<void>
}

export async function buildContext({
  event,
}: H3ContextFunctionArgument): Promise<Context> {
  const config = resolve('Config')
  const authService = resolve('AuthService')
  const sessionHandler = await useSession<Session>(event, {
    name: 'session',
    password: config.session.seal,
    cookie: {
      // Blocks sending a cookie in a cross-origin request, protects somewhat against CORS attacks
      sameSite: 'strict',
    },
  })
  let userSessionPromise: Promise<
    | {
        user: User
        session: Session
      }
    | {
        user: null
        session: null
      }
  > | null = null
  function getUserSessionPromise() {
    if (!sessionHandler.data.id) {
      userSessionPromise = Promise.resolve({ user: null, session: null })
      return userSessionPromise
    }
    if (userSessionPromise) {
      return userSessionPromise
    }
    const promise = authService.getSession(sessionHandler.data.id)
    userSessionPromise = promise
    return promise
  }
  return {
    getSession: async () => {
      return (await getUserSessionPromise()).session
    },
    getSessionId: () => sessionHandler.data.id ?? null,
    getUser: async () => {
      return (await getUserSessionPromise()).user
    },
    setSession: async (session) => {
      if (session === null) {
        await sessionHandler.clear()
        return
      }
      // Remove an existing session cookie from the response
      // not sure why this is necessary, seems to be a bug in h3
      let cookies = getRequestHeader(event, 'set-cookie') ?? []
      let cookiesArray = Array.isArray(cookies) ? cookies : [cookies]
      let filteredCookies = cookiesArray.filter(
        (cookie) => !cookie.startsWith('session='),
      )
      setHeader(event, 'set-cookie', filteredCookies)

      await sessionHandler.update({ id: session.id })
    },
  }
}
