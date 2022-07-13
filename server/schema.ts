import { addResolversToSchema } from '@graphql-tools/schema'
import { GraphQLSchema } from 'graphql'
import { loadSchema as loadGraphqlSchema } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

async function addResolvers(schema: GraphQLSchema) {
  const { loadResolvers } = await import('./resolvers')
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
export async function loadSchemaWithResolvers(): Promise<GraphQLSchema> {
  const { schema } = await import('#graphql/schema')
  return await addResolvers(schema)
}

/**
 * Loads the schema from the GraphQL files.
 * This method should not be used in production, since the graphql files are not deployed.
 * @returns the GraphQL schema
 */
export async function loadSchemaFromFiles(): Promise<GraphQLSchema> {
  return await loadGraphqlSchema('./server/**/*.graphql', {
    loaders: [new GraphQLFileLoader()],
  })
}

/**
 * Loads the schema from the GraphQL files and adds the resolvers.
 * This method should not be used in production, since the graphql files are not deployed.
 * @returns the GraphQL schema
 */
export async function loadSchemaFromFilesWithResolvers(): Promise<GraphQLSchema> {
  return addResolvers(await loadSchemaFromFiles())
}
