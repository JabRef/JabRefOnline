import 'reflect-metadata'
import { PrismaClient } from '@prisma/client'

import { container, instanceCachingFactory } from 'tsyringe'
import { createRedisClient } from './utils/services.factory'

container.register<PrismaClient>('PrismaClient', {
  useFactory: instanceCachingFactory<PrismaClient>(() => new PrismaClient()),
})

container.register('RedisClient', {
  useFactory: instanceCachingFactory(async () => await createRedisClient()),
})
