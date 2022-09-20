// eslint-disable-next-line import/default
import prisma from '@prisma/client'
import dotenv from 'dotenv'
import 'reflect-metadata'
import { beforeAll } from 'vitest'
import { constructConfig } from '~/config'
import { register } from '~/server/tsyringe'
import { registerClasses } from '~/server/tsyringe.config'
import { createRedisClient } from '~/server/utils/services.factory'
import { GraphqlSerializer } from './snapshot.graphql'

// Register custom graphql serializer
expect.addSnapshotSerializer(GraphqlSerializer)

// Load environment variables from .env file
dotenv.config()

// Expose reflect-metadata
globalThis.Reflect = Reflect

// @ts-expect-error: Vitest doesn't allow an easy way to add typescript info for globalThis
globalThis.useRuntimeConfig = () => constructConfig()

// Register services for all tests
registerClasses()

// Setup services for integration tests
beforeAll(async (context) => {
  const isIntegrationTest = context.filepath?.endsWith('test.ts') ?? false

  if (isIntegrationTest) {
    const redisClient = await createRedisClient()
    register('RedisClient', {
      useValue: redisClient,
    })

    const prismaClient = new prisma.PrismaClient()
    register('PrismaClient', {
      useValue: prismaClient,
    })

    return async () => {
      if ('disconnect' in redisClient) {
        await redisClient.disconnect()
      }
      await prismaClient.$disconnect()
    }
  }
})
