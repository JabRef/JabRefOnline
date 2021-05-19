import 'reflect-metadata'
import { PrismaClient } from '@prisma/client'
import Redis from 'ioredis'

import { container, instanceCachingFactory } from 'tsyringe'

container.register<PrismaClient>(PrismaClient, {
  useFactory: instanceCachingFactory<PrismaClient>(() => new PrismaClient()),
})

container.register<Redis.Redis>(Redis, {
  useFactory: instanceCachingFactory<Redis.Redis>(() => new Redis()),
})
