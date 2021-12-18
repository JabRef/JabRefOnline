import { RedisClientType } from 'redis'
import prisma from '@prisma/client'
import { container, instanceCachingFactory } from 'tsyringe'
import { createRedisClient } from '~/api/utils/services.factory'

// Register services for all tests
container.register('RedisClient', {
  useFactory: instanceCachingFactory(async () => await createRedisClient()),
})
afterAll(() => container.resolve<RedisClientType>('RedisClient').quit())

// Setup services for integration tests
// @ts-ignore: Jest doesn't allow an easy way to add typescript info
if (global.isIntegrationTest) {
  container.register('PrismaClient', {
    useFactory: instanceCachingFactory(() => new prisma.PrismaClient()),
  })
}
