/**
 * Prisma configuration file
 * See: https://www.prisma.io/docs/orm/reference/prisma-config-reference
 */

import path from 'node:path'
import { config } from 'dotenv'
import { defineConfig } from 'prisma/config'

// Load environment variables from .env file
config()

export default defineConfig({
  schema: path.join('server', 'database', 'schema.prisma'),
  migrations: {
    seed: 'jiti ./server/database/runSeed.ts',
  },
})
