/**
 * Prisma configuration file  
 * See: https://www.prisma.io/docs/orm/reference/prisma-config-reference
 */

export default {
  schema: 'server/database/schema.prisma',
  migrations: {
    seed: 'jiti ./server/database/runSeed.ts'
  }
}