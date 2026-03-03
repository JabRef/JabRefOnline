/**
 * Prisma configuration file
 * See: https://www.prisma.io/docs/orm/reference/prisma-config-reference
 */

import { config } from 'dotenv'
import path from 'node:path'
import { defineConfig } from 'prisma/config'

// Load environment variables from .env file
config()

const databaseUrl = process.env.NUXT_DATABASE_URL

export default defineConfig({
  schema: path.join('server', 'database', 'schema.prisma'),
  migrations: {
    path: path.join('server', 'database', 'migrations'),
    seed: 'jiti ./server/database/runSeed.ts',
  },
  ...(databaseUrl !== undefined
    ? {
        datasource: {
          url: databaseUrl,
          shadowDatabaseUrl: databaseUrl,
        },
      }
    : {}),
})
