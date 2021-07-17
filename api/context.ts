import { User } from '@prisma/client'
import {
  AuthenticateReturn,
  buildContext as passportBuildContext,
} from 'graphql-passport'
import { ContextParams } from 'graphql-passport/lib/buildContext'

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

export function buildContext({ req, res }: ContextParams): Context {
  return {
    ...passportBuildContext<User>({ req, res }),
  }
}
