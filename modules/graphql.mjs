import { defineNuxtModule } from '@nuxt/kit'
import { printSchema } from 'graphql'
import { loadSchema as loadGraphqlSchema } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

// WARNING: This is a duplicate of the function with the same name defined in server/schema
// Due to how nuxt/kit works, we have to define the module as a mjs file instead of ts (otherwise it resolves imports as cjs)
// And thus we cannot reuse a ts file here
/**
 * Loads the schema from the GraphQL files.
 * This method should not be used in production, since the graphql files are not deployed.
 * @returns the GraphQL schema
 */
 export async function loadSchemaFromFiles()/*: Promise<GraphQLSchema>*/ {
  return await loadGraphqlSchema('./server/**/*.graphql', {
    loaders: [new GraphQLFileLoader()],
  })
}

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook('nitro:config', async (nitroConfig) => {
      // Register #graphql/schema virtual module
      nitroConfig.virtual = nitroConfig.virtual || {}
      nitroConfig.virtual['#graphql/schema'] = async () => {
        const schema = await loadSchemaFromFiles()
        return `
          import { loadSchemaSync } from '@graphql-tools/load'
          import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
          export const schema = loadSchemaSync(\`${printSchema(schema)}\`, {
            loaders: [new GraphQLFileLoader()]
          })
        `
      }
    })
  },
})
