import 'reflect-metadata'
import { GraphQLResponse } from 'apollo-server-types'
import { container, instanceCachingFactory } from 'tsyringe'
import { RedisClient } from 'redis'
import redis from 'redis-mock'
import { PrismaClient } from '@prisma/client'

// Minimize snapshot of GraphQL responses (no extensions and http field)
expect.addSnapshotSerializer({
  test: (value) => {
    return (
      value != null &&
      ((value as GraphQLResponse).data !== undefined ||
        (value as GraphQLResponse).errors !== undefined) &&
      (value as GraphQLResponse).http !== undefined
    )
  },
  print: (value: unknown, serialize) => {
    const { data, errors } = value as GraphQLResponse
    return serialize({
      ...(data !== undefined && {
        data,
      }),
      ...(errors !== undefined && {
        errors,
      }),
    })
  },
})

// Setup dependencies for tests
container.register('PrismaClient', {
  useFactory: instanceCachingFactory(() => new PrismaClient()),
})

container.register(RedisClient, {
  useFactory: instanceCachingFactory(() => redis.createClient()),
})
