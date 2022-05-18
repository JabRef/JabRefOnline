import prisma from '@prisma/client'
import dotenv from 'dotenv'
import { register, resolve, instanceCachingFactory } from '~/api/tsyringe'
import { createRedisClient } from '~/api/utils/services.factory'

// Register services for all tests
register('RedisClient', {
  useValue: await createRedisClient(),
})
afterAll(async () => {
  await resolve('RedisClient').quit()
})

// Setup services for integration tests
// @ts-ignore: Jest doesn't allow an easy way to add typescript info
if (global.isIntegrationTest) {
  register('PrismaClient', {
    useFactory: instanceCachingFactory(() => new prisma.PrismaClient()),
  })
}

// Load environment variables from .env file
dotenv.config()
