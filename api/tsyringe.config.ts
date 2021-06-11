import 'reflect-metadata'
import { PrismaClient } from '@prisma/client'
import { RedisClient, createClient } from 'redis'

import { container, instanceCachingFactory } from 'tsyringe'

container.register<PrismaClient>(PrismaClient, {
  useFactory: instanceCachingFactory<PrismaClient>(() => new PrismaClient()),
})

container.register<RedisClient>(RedisClient, {
  useFactory: instanceCachingFactory<RedisClient>(() =>
    createClient({
      port: 6380,
      host: process.env.REDISCACHEHOSTNAME,
      password: process.env.REDISCACHEKEY,
      tls: { servername: process.env.REDISCACHEHOSTNAME },
    })
  ),
})
