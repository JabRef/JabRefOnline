import 'reflect-metadata'
import { PrismaClient } from '@prisma/client'
import { RedisClient, createClient } from 'redis'

import { container, instanceCachingFactory } from 'tsyringe'
import { config } from '../config'

container.register<PrismaClient>(PrismaClient, {
  useFactory: instanceCachingFactory<PrismaClient>(() => new PrismaClient()),
})

container.register<RedisClient>(RedisClient, {
  useFactory: instanceCachingFactory<RedisClient>(() =>
    createClient({
      ...config.redis,
      tls: { servername: config.redis.host },
    })
  ),
})
