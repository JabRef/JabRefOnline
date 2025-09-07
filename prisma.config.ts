// Prisma configuration file
// Replaces the deprecated `prisma` field in package.json
// See: https://www.prisma.io/docs/orm/reference/prisma-config-reference

export default {
  // Path to the Prisma schema file
  schema: 'server/database/schema.prisma'
  
  // Note: The seed configuration remains in package.json for now,
  // as it may not be fully supported in the config file yet.
  // This is expected behavior during the migration period.
}