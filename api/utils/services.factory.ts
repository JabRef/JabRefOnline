import redis, { ClientOpts, RedisClient } from 'redis'
import redisMock from 'redis-mock'
import { config, Environment } from '~/config'

export function createRedisClient(): RedisClient {
  if (config.environment === Environment.LocalDevelopment) {
    return redisMock.createClient()
  } else {
    const redisConfig: ClientOpts = {
      ...config.redis,
    }
    // Azure needs a TLS connection to Redis
    if (config.environment === Environment.Production) {
      redisConfig.tls = { servername: config.redis.host }
    }
    return redis.createClient(redisConfig)
  }
}
