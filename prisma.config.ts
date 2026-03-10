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
const shadowDatabaseUrl = process.env.NUXT_SHADOW_DATABASE_URL

export default defineConfig({
  schema: path.join('server'),
  migrations: {
    path: path.join('server', 'migrations'),
    seed: 'jiti ./server/database/runSeed.ts',
  },
  ...(databaseUrl !== undefined
    ? {
        datasource: {
          url: databaseUrl,
          ...(shadowDatabaseUrl !== undefined ? { shadowDatabaseUrl } : {}),
        },
      }
    : {}),
})
