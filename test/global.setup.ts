// eslint-disable-next-line import/default
import prisma from '@prisma/client'
import dotenv from 'dotenv'
import 'reflect-metadata'
import { beforeAll } from 'vitest'
import { constructConfig } from '~/config'
import { register } from '~/server/tsyringe'
import { registerClasses } from '~/server/tsyringe.config'
import { EmailServiceMock } from '~/server/utils/email.service'
import { createRedisClient } from '~/server/utils/services.factory'
import { GraphqlSerializer } from './snapshot.graphql'

// Register custom graphql serializer
expect.addSnapshotSerializer(GraphqlSerializer)

// Load environment variables from .env file
dotenv.config()

// Expose reflect-metadata
globalThis.Reflect = Reflect

// Register services for all tests
registerClasses()

// Setup services for tests
beforeAll(async (context) => {
  register('EmailService', { useValue: new EmailServiceMock() })

  const isIntegrationTest =
    context.filepath?.endsWith('integration.test.ts') ?? false

  if (isIntegrationTest) {
    const config = constructConfig()
    const redisClient = await createRedisClient(config)
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
