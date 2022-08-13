import { defineNuxtModule } from '@nuxt/kit'
import { printSchema } from 'graphql'
import type { NitroConfig } from 'nitropack'
import { loadSchemaFromFiles } from '~/server/schema'

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook('nitro:config', async (nitroConfig: NitroConfig) => {
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
