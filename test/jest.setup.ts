import 'reflect-metadata'
import '~/api/tsyringe.config'
import { GraphQLResponse } from 'apollo-server-types'
import { container } from 'tsyringe'
import { RedisClient } from 'redis'

// Minimize snapshot of GraphQL responses (no extensions and http field)
expect.addSnapshotSerializer({
  test: (value) => {
    return (
      value !== undefined &&
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

afterAll(() => container.resolve(RedisClient).quit())
