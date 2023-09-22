/* eslint-disable @typescript-eslint/no-unsafe-assignment */ // TODO: Remove once redis-mock is updated
import { Config, Environment } from '~/config'

import { Redis } from 'ioredis'
import { createStorage, Storage } from 'unstorage'
import memoryDriver from 'unstorage/drivers/memory'

export async function createRedisClient(config: Config): Promise<Storage> {
  if (
    config.public.environment === Environment.LocalDevelopment ||
    config.public.environment === Environment.AzureBuild
  ) {
    return createStorage({
      driver: memoryDriver(),
    })
  } else {
    function createRedisConfig() {
      switch (config.public.environment) {
        case Environment.Production:
          return {
            cluster: [
              {
                port: config.redis.port,
                host: config.redis.host,
              },
            ],
            clusterOptions: {
              redisOptions: {
                // Azure needs a TLS connection to Redis
                tls: { servername: config.redis.host },
                password: config.redis.password,
              },
            },
          }
        case Environment.CI:
        default:
          // Redis on Github Actions does not need a password
          return {
            port: config.redis.port,
            host: config.redis.host,
          }
      }
    }

    // Create redis instance to test connection
    const redisClient = new Redis(createRedisConfig())
    redisClient.on('error', (error) => {
      console.error('Redis error', error)
    })
    redisClient.on('ready', () => {
      console.warn('Redis ready')
    })
    redisClient.on('connect', () => {
      console.warn('Redis connected')
    })
    redisClient.on('close', () => {
      console.warn('Redis closed')
    })
    await redisClient.set('test', 'test')

    const { default: redisDriver } = await import('unstorage/drivers/redis')
    return createStorage({
      driver: redisDriver({
        base: '{unstorage}',
        // We don't queue commands if Redis is not available but instead fail
        // (otherwise this would mask errors)
        enableOfflineQueue: false,
        ...createRedisConfig(),
      }),
    })
  }
}
