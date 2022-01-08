import prisma from '@prisma/client'
import { container, instanceCachingFactory } from 'tsyringe'
import { createRedisClient } from './utils/services.factory'

const { PrismaClient } = prisma

export async function configure(): Promise<void> {
  container.register('PrismaClient', {
    useFactory: instanceCachingFactory(() => new PrismaClient()),
  })

  container.register('RedisClient', {
    useValue: await createRedisClient(),
  })
}
