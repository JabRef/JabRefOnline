import prisma from '@prisma/client'
import dotenv from 'dotenv'
import { instanceCachingFactory, register, resolve } from '~/api/tsyringe'
import { registerClasses } from '~/api/tsyringe.config'
import { createRedisClient } from '~/api/utils/services.factory'

// Register services for all tests
registerClasses()
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
