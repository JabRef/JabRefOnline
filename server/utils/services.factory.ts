/* eslint-disable @typescript-eslint/no-unsafe-assignment */ // TODO: Remove once redis-mock is updated
import { Config, Environment } from '~/config'

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
          // Redis on Github Actions does not need a password
          return {
            port: config.redis.port,
            host: config.redis.host,
          }
      }
    }

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
