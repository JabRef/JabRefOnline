import { addResolversToSchema } from '@graphql-tools/schema'
import { GraphQLSchema } from 'graphql'
import { loadSchemaSync as loadGraphqlSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadResolvers } from './resolvers'

function addResolvers(schema: GraphQLSchema) {
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

/**
 * Loads the schema and the resolvers.
 * @returns the GraphQL schema
 */
export async function loadSchema(): Promise<GraphQLSchema> {
  const { schema } = await import('#graphql/schema')
  return addResolvers(schema)
}

/**
 * Loads the schema from the GraphQL files and adds the resolvers.
 * This method should not be used in production, since the graphql files are not deployed.
 * @returns the GraphQL schema
 */
export function loadSchemaFromFiles(): GraphQLSchema {
  const schema = loadGraphqlSchemaSync('./server/**/*.graphql', {
          loaders: [new GraphQLFileLoader()],
        })
  return addResolvers(schema)
}
