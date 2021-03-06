// Taken from https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/instantiate-prisma-client

import { PrismaClient } from '@prisma/client'

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

export interface Context {
  prisma: PrismaClient
}

export function createContext (): Context {
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
  return { prisma }
}
