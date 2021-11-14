import prisma from '@prisma/client'
import { RedisClient } from 'redis'
import { container, instanceCachingFactory } from 'tsyringe'
import { createRedisClient } from './utils/services.factory'

const { PrismaClient } = prisma

export function configure(): void {
  container.register('PrismaClient', {
    useFactory: instanceCachingFactory(() => new PrismaClient()),
  })

  container.register(RedisClient, {
    useFactory: instanceCachingFactory(() => createRedisClient()),
  })
}
