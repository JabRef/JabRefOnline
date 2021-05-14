import 'reflect-metadata'
import '~/api/tsyringe.config'
import { GraphQLResponse } from 'apollo-server-types'

// Minimize snapshot of GraphQL responses (no extensions and http field)
expect.addSnapshotSerializer({
  test: (value) => {
    value = value as GraphQLResponse
    return value && value.data !== undefined && value.http
  },
  print: (value: unknown, serialize) => {
    const { data, errors } = value as GraphQLResponse
    return serialize({
      data,
      ...(errors !== undefined && {
        errors,
      }),
    })
  },
})
