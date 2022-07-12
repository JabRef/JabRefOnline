import { addResolversToSchema } from '@graphql-tools/schema'
import { GraphQLSchema } from 'graphql'
import { loadResolvers } from './resolvers'
import { schema } from '#graphql/schema'

/**
 * Synchronously loads the schema and the resolvers.
 * @returns the GraphQL schema
 */
export function loadSchema(): GraphQLSchema {
  const resolvers = loadResolvers()

  return addResolversToSchema({
    schema,
    resolvers,
    resolverValidationOptions: {
      // Ignore additional methods in our resolver classes (e.g. private fields)
      requireResolversToMatchSchema: 'ignore',
    },
  })
}
