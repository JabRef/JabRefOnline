// Taken from https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/instantiate-prisma-client

import { PrismaClient, User } from '@prisma/client'
import express from 'express'
import { buildContext } from 'graphql-passport'
import { AuthenticateReturn } from './passport/auth.service'

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

export interface Context {
  prisma: PrismaClient
  isAuthenticated: () => boolean
  isUnauthenticated: () => boolean
  getUser: () => User
  authenticate: (strategyName: string, options?: Record<string, unknown>) => Promise<AuthenticateReturn>
  login: (user: User, options?: Record<string, unknown>) => Promise<void>
  logout: () => void
}

export function createContext (req: express.Request, res: express.Response): Context {
  let prisma: PrismaClient
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
  } else {
    // Prevent hot reloading from creating new instances of PrismaClient
    if (!global.prisma) {
      global.prisma = new PrismaClient()
    }
    prisma = global.prisma
  }
  return {
    prisma,
    ...buildContext<User>({ req, res })
  }
}
