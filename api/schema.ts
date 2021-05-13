import { loadSchemaSync as loadGraphqlSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import { GraphQLSchema } from 'graphql'
import resolvers from './resolvers'

/**
 * Synchronously loads the schema and the resolvers.
 * @returns the GraphQL schema
 */
export function loadSchema(): GraphQLSchema {
  const typeDefs = loadGraphqlSchemaSync('./api/**/*.graphql', {
    loaders: [new GraphQLFileLoader()],
  })

  return addResolversToSchema(typeDefs, resolvers)
}
