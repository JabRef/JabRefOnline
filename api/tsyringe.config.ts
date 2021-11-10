import prisma from '@prisma/client'
import { RedisClient, createClient, ClientOpts } from 'redis'
import './tsyringe.config'
import { container, instanceCachingFactory } from 'tsyringe'
import { Environment } from '../config'
import config from '#config'

const { PrismaClient } = prisma

export function configure(): void {
  container.register('PrismaClient', {
    useFactory: instanceCachingFactory(() => new PrismaClient()),
  })

  container.register(RedisClient, {
    useFactory: instanceCachingFactory(() => {
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
}
