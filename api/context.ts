import { User } from '@prisma/client'
import {
  buildContext as passportBuildContext,
  PassportContext,
} from 'graphql-passport'
import { ContextParams } from 'graphql-passport/lib/buildContext'
import { Request as ExpressRequest } from 'express'
import { Redis } from 'ioredis'
import { AuthenticateResponse } from './user/auth.service'

export interface MyContext extends PassportContext<User, ExpressRequest> {
  redis: Redis
}

export interface Context {
  redis: Redis
  isAuthenticated: () => boolean
  isUnauthenticated: () => boolean
  getUser: () => User
  authenticate: (
    strategyName: string,
    options?: Record<string, unknown>
  ) => Promise<AuthenticateResponse>
  login: (user: User, options?: Record<string, unknown>) => Promise<void>
  logout: () => void
}

export function buildContext(
  { req, res }: ContextParams,
  redis: Redis
): Context {
  return {
    ...passportBuildContext<User>({ req, res }),
    redis,
  }
}
