import { User } from '@prisma/client'
import express from 'express'
import { buildContext as passportBuildContext } from 'graphql-passport'
import { AuthenticateReturn } from './passport/auth.service'

export interface Context {
  isAuthenticated: () => boolean
  isUnauthenticated: () => boolean
  getUser: () => User
  authenticate: (strategyName: string, options?: Record<string, unknown>) => Promise<AuthenticateReturn>
  login: (user: User, options?: Record<string, unknown>) => Promise<void>
  logout: () => void
}

export function buildContext (req: express.Request, res: express.Response): Context {
  return {
    ...passportBuildContext<User>({ req, res })
  }
}
