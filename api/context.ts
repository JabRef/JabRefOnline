import { User } from '@prisma/client'
import { buildContext as passportBuildContext } from 'graphql-passport'
import { ContextParams } from 'graphql-passport/lib/buildContext'
import { AuthenticateReturn } from './user/auth.service'

export interface Context {
  isAuthenticated: () => boolean
  isUnauthenticated: () => boolean
  getUser: () => User
  authenticate: (
    strategyName: string,
    options?: Record<string, unknown>
  ) => Promise<AuthenticateReturn>
  login: (user: User, options?: Record<string, unknown>) => Promise<void>
  logout: () => void
}

export function buildContext({ req, res }: ContextParams): Context {
  return {
    ...passportBuildContext<User>({ req, res }),
  }
}
