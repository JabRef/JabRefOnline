import redis, { RedisClientType } from 'redis'
import redisMock from 'redis-mock'
import { config, Environment } from '~/config'
import { promisify } from 'util'

export function createRedisClient(): RedisClientType<any, any> {
  if (config.environment === Environment.LocalDevelopment) {
    const mockRedis = redisMock.createClient()
    // Workaround for redis-mock being not compatible with redis@4
    // TODO: Remove this workaround once https://github.com/yeahoffline/redis-mock/issues/195 is fixed
    return {
      get: promisify(mockRedis.get).bind(mockRedis),
      delete: promisify(mockRedis.del).bind(mockRedis),
      flushAll: promisify(mockRedis.flushAll).bind(mockRedis),
      setEx: promisify(mockRedis.setEx).bind(mockRedis),
      expire: promisify(mockRedis.expire).bind(mockRedis),
    } as unknown as RedisClientType
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
    if (config.environment !== Environment.Production) {
      delete redisConfig.socket.tls
    }
    // Redis on Github Actions does not need a password
    if (config.environment === Environment.CI) {
      delete redisConfig.password
    }
    return redis.createClient(redisConfig)
  }
}
