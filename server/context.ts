import { User } from '@prisma/client'
import {
  AuthenticateReturn,
  buildContext as passportBuildContext,
} from 'graphql-passport'
import { CompatibilityEvent } from 'h3'

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

export function buildContext(event: CompatibilityEvent): Context {
  return {
    // @ts-ignore: h3 doesn't provide correct types https://github.com/unjs/h3/issues/146
    ...passportBuildContext<User>({ req: event.req, res: event.res }),
  }
}
