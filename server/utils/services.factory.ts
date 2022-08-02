/* eslint-disable @typescript-eslint/no-misused-promises */ // TODO: Remove once redis-mock is updated
/* eslint-disable @typescript-eslint/no-unsafe-assignment */ // TODO: Remove once redis-mock is updated
import { promisify } from 'util'
import redis, { RedisClientType } from 'redis'
import { Environment } from '~/config'

export async function createRedisClient(): Promise<
  RedisClientType<any, any, any>
> {
  const config = useRuntimeConfig()
  if (
    config.public.environment === Environment.LocalDevelopment ||
    config.public.environment === Environment.AzureBuild
  ) {
    const redisMock = (await import('redis-mock')).default
    const mockRedis = redisMock.createClient()
    // Workaround for redis-mock being not compatible with redis@4
    // TODO: Remove this workaround once https://github.com/yeahoffline/redis-mock/issues/195 is fixed
    return {
      get: promisify(mockRedis.get).bind(mockRedis),
      quit: promisify(mockRedis.quit).bind(mockRedis),
      /*
      delete: promisify(mockRedis.del).bind(mockRedis),
      flushAll: promisify(mockRedis.flushAll).bind(mockRedis),
      setEx: promisify(mockRedis.setEx).bind(mockRedis),
      expire: promisify(mockRedis.expire).bind(mockRedis),
      */
    } as unknown as RedisClientType<any, any>
  } else {
    const redisConfig = {
      password: config.redis.password as string | undefined,
      socket: {
        port: config.redis.port,
        host: config.redis.host,
        tls: true as true | undefined,
      },
    }

    // Only Azure needs a TLS connection to Redis
    if (config.public.environment !== Environment.Production) {
      delete redisConfig.socket.tls
    }
    // Redis on Github Actions does not need a password
    if (config.public.environment === Environment.CI) {
      delete redisConfig.password
    }
    const client = redis.createClient(redisConfig)
    await client.connect()
    return client
  }
}
