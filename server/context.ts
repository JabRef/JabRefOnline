import { User } from '@prisma/client'
import expressSession from 'express-session/index.js'
import {
  AuthenticateReturn,
  buildContext as passportBuildContext,
} from 'graphql-passport'
import type { H3Event } from 'h3'

export interface Context {
  isAuthenticated: () => boolean
  isUnauthenticated: () => boolean
  getUser: () => User | null
  authenticate: (
    strategyName: string,
    options?: Record<string, unknown>
  ) => Promise<AuthenticateReturn<User>>
  login: (user: User, options?: Record<string, unknown>) => Promise<void>
  logout: () => void
}

export function buildContext(event: H3Event): Context {
  return {
    // @ts-expect-error: h3 doesn't provide correct types https://github.com/unjs/h3/issues/146
    ...passportBuildContext<User>({ req: event.req, res: event.res }),
    // The login method provided by graphql-passport doesn't work on azure, so we have to override it
    login: async (user, options) => {
      // @ts-expect-error: there are no correct types for this
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const session = event.req.session
      if (!session) {
        throw new Error(
          'Login sessions require session support. Did you forget to use `express-session` middleware?'
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
            return reject(err)
          }
          // For some strange reason the session cookie is not set correctly on azure, so do this manually
          // @ts-expect-error: internal
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          expressSession.setcookie(
            event.res,
            'session',
            // @ts-expect-error: there are no correct types for this
            event.req.sessionID,
            useRuntimeConfig().session.primarySecret,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            session.cookie.data
          )
          resolve()
        })
      })
    },
  }
}
