import 'reflect-metadata'
import { PrismaClient } from '@prisma/client'
import { RedisClient, createClient, ClientOpts } from 'redis'

import { container, instanceCachingFactory } from 'tsyringe'
import { config, Environment } from '../config'

container.register<PrismaClient>(PrismaClient, {
  useFactory: instanceCachingFactory<PrismaClient>(() => new PrismaClient()),
})

container.register<RedisClient>(RedisClient, {
  useFactory: instanceCachingFactory<RedisClient>(() => {
    const redisConfig: ClientOpts = {
      ...config.redis,
    }
    // Azure needs a TLS connection to Redis
    if (config.environment === Environment.Production) {
      redisConfig.tls = { servername: config.redis.host }
    }
    return createClient(redisConfig)
  }),
})
