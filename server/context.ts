import { H3ContextFunctionArgument } from '@as-integrations/h3'
import { User } from '@prisma/client'
import {
  AuthenticateReturn,
  buildContext as passportBuildContext,
} from 'graphql-passport'

export interface Context {
  isAuthenticated: () => boolean
  isUnauthenticated: () => boolean
  getUser: () => User | null
  authenticate: (
    strategyName: string,
    options?: Record<string, unknown>,
  ) => Promise<AuthenticateReturn<User>>
  login: (user: User, options?: Record<string, unknown>) => Promise<void>
  logout: () => void
}

export function buildContext({
  event,
}: H3ContextFunctionArgument): Promise<Context> {
  return Promise.resolve({
    // @ts-expect-error: h3 doesn't provide correct types https://github.com/unjs/h3/issues/146
    ...passportBuildContext<User>({ req: event.req, res: event.res }),
    // The login method provided by graphql-passport doesn't work on azure, so we have to override it
    login: async (user) => {
      // @ts-expect-error: there are no correct types for this
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const session = event.req.session
      if (!session) {
        throw new Error(
          'Login sessions require session support. Did you forget to use `express-session` middleware?',
        )
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      session.passport = session.passport || {}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      session.passport.user = user.id
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        session.save(function (err: any) {
          if (err) {
            reject(err)
            return
          }
          // For some strange reason the session cookie is not set correctly on azure, so do this manually
          // const signed =
          //   's:' +
          //   signature.sign(
          //     event.req.sessionID,
          //     useRuntimeConfig().session.primarySecret,
          //   )
          // const data = cookie.serialize('session', signed, session.cookie.data)
          // setCookie(event, 'session', data)
          // expressSession.setcookie(
          //   event.res,
          //   'session',
          //   // @ts-expect-error: there are no correct types for this
          //   event.req.sessionID,
          //   useRuntimeConfig().session.primarySecret,
          //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          //   session.cookie.data,
          // )
          resolve()
        })
      })
    },
  })
}
