import { RedisClientType } from 'redis'
import prisma from '@prisma/client'
import { container, instanceCachingFactory } from 'tsyringe'
import dotenv from 'dotenv'
import { constructConfig } from '~/config'
import { createRedisClient } from '~/server/utils/services.factory'

// Load environment variables from .env file
dotenv.config()

// @ts-ignore: Jest doesn't allow an easy way to add typescript info
global.useRuntimeConfig = () => constructConfig()

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
