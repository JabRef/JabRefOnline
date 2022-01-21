import { RedisClientType } from 'redis'
import prisma from '@prisma/client'
import { container, instanceCachingFactory } from 'tsyringe'
import dotenv from 'dotenv'
import { createRedisClient } from '~/api/utils/services.factory'

// Register services for all tests
container.register('RedisClient', {
  useValue: await createRedisClient(),
})
afterAll(async () => {
  await container.resolve<RedisClientType<any, any>>('RedisClient').quit()
})

// Setup services for integration tests
// @ts-ignore: Jest doesn't allow an easy way to add typescript info
if (global.isIntegrationTest) {
  container.register('PrismaClient', {
    useFactory: instanceCachingFactory(() => new prisma.PrismaClient()),
  })
}

// Load environment variables from .env file
dotenv.config()
