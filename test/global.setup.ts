// eslint-disable-next-line import/default
import prisma from '@prisma/client'
import 'dotenv/config'
import 'json-bigint-patch'
import 'reflect-metadata'
import { beforeAll, expect } from 'vitest'
import { constructConfig } from '~/config'
import { register } from '~/server/tsyringe'
import { registerClasses } from '~/server/tsyringe.config'
import { EmailServiceMock } from '~/server/utils/email.service'
import { createRedisClient } from '~/server/utils/services.factory'
import { GraphqlSerializer } from './snapshot.graphql'

// Register custom graphql serializer
expect.addSnapshotSerializer(GraphqlSerializer)

// Expose reflect-metadata
globalThis.Reflect = Reflect

// Register services for all tests
registerClasses()

// Setup services for tests
beforeAll((context) => {
  register('EmailService', { useValue: new EmailServiceMock() })
  const config = constructConfig()
  register('Config', {
    useValue: config,
  })

  const isIntegrationTest =
    context.filepath?.endsWith('integration.test.ts') ?? false

  if (isIntegrationTest) {
    const redisClient = createRedisClient(config)
    register('RedisClient', {
      useValue: redisClient,
    })

    const prismaClient = new prisma.PrismaClient()
    register('PrismaClient', {
      useValue: prismaClient,
    })

    return async () => {
      await redisClient.dispose()
      await prismaClient.$disconnect()
    }
  }
})
