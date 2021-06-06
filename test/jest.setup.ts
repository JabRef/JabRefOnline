import 'reflect-metadata'
import '~/api/tsyringe.config'
import { GraphQLResponse } from 'apollo-server-types'
import { container } from 'tsyringe'
import { AuthService } from '../api/user/auth.service'

// Minimize snapshot of GraphQL responses (no extensions and http field)
expect.addSnapshotSerializer({
  test: (value) => {
    value = value as GraphQLResponse
    return value && (value.data || value.errors) && value.http
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

afterAll(() => container.resolve(AuthService).closeRedisInstance())
