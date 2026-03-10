import { Environment, type Config } from '~/config'

import { createStorage, type Storage } from 'unstorage'
import memoryDriver from 'unstorage/drivers/memory'
import redisDriver from 'unstorage/drivers/redis'

export function createRedisClient(config: Config): Storage {
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
                port: Number(config.redis.port),
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
            port: Number(config.redis.port),
            host: config.redis.host,
          }
      }
    }

    // Create redis instance to test connection
    /*
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
    */

    return createStorage({
      driver: redisDriver({
        base: '{unstorage}',
        ...createRedisConfig(),
      }),
    })
  }
}
