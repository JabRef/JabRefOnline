import { loadSchemaSync as loadGraphqlSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import { GraphQLSchema } from 'graphql'
import { loadResolvers } from './resolvers'

/**
 * Synchronously loads the schema and the resolvers.
 * @returns the GraphQL schema
 */
export function loadSchema(): GraphQLSchema {
  const typeDefs = loadGraphqlSchemaSync('./server/**/*.graphql', {
    loaders: [new GraphQLFileLoader()],
  })
  const resolvers = loadResolvers()

  return addResolversToSchema({
    schema: typeDefs,
    resolvers,
    resolverValidationOptions: {
      // Ignore additional methods in our resolver classes (e.g. private fields)
      requireResolversToMatchSchema: 'ignore',
    },
  })
}
