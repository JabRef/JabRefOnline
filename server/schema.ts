import { schema } from '#graphql/schema'
import { makeExecutableSchema } from '@graphql-tools/schema'
import type { TypeSource } from '@graphql-tools/utils'
import { GraphQLSchema } from 'graphql'

async function addResolvers(schema: TypeSource) {
  const { loadResolvers } = await import('./resolvers')
  const resolvers = loadResolvers()

  return makeExecutableSchema({
    typeDefs: schema,
    resolvers,
    resolverValidationOptions: {
      // Ignore additional methods in our resolver classes (e.g. private fields)
      requireResolversToMatchSchema: 'ignore',
    },
  })
}

/**
 * Loads the schema and the resolvers.
 * @returns the GraphQL schema
 */
export async function loadSchemaWithResolvers(): Promise<GraphQLSchema> {
  return await addResolvers(schema)
}
