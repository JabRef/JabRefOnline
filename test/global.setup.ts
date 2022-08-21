// eslint-disable-next-line import/default
import prisma from '@prisma/client'
import dotenv from 'dotenv'
import { constructConfig } from '~/config'
import { instanceCachingFactory, register, resolve } from '~/server/tsyringe'
import { registerClasses } from '~/server/tsyringe.config'
import { createRedisClient } from '~/server/utils/services.factory'

// Load environment variables from .env file
dotenv.config()

// @ts-ignore: Jest doesn't allow an easy way to add typescript info
global.useRuntimeConfig = () => constructConfig()

// Register services for all tests
registerClasses()

// Setup services for integration tests
// @ts-ignore: Jest doesn't allow an easy way to add typescript info
if (global.isIntegrationTest) {
  const redisClient = await createRedisClient()
  console.log('start')
  register('RedisClient', {
    useValue: redisClient,
  })
  afterAll(async () => {
    console.log('quite')
    await resolve('RedisClient').quit()
  })

  register('PrismaClient', {
    useFactory: instanceCachingFactory(() => new prisma.PrismaClient()),
  })
}
