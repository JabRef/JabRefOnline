// eslint-disable-next-line import/default
import prismaClient from '@prisma/client'
import { seed } from './seed'

/**
 * Drop all data from the (Postgres) database.
 *
 * This is an optimization which is particularly crucial for unit testing.
 * This code takes milliseconds, vs multiple seconds for a prisma migrate reset + db push
 *
 * Code taken from https://github.com/prisma/prisma/issues/742#issuecomment-776901281.
 * It is necessary as long as https://github.com/prisma/prisma/issues/5596 is not implemented.
 */
export async function truncate(): Promise<void> {
  const prisma = new prismaClient.PrismaClient()
  const dbSchemaName = 'public'

  try {
    for (const { tablename } of (await prisma.$queryRawUnsafe(
      `SELECT tablename FROM pg_tables WHERE schemaname='${dbSchemaName}';`
    )) as any) {
      await prisma.$queryRawUnsafe(
        `TRUNCATE TABLE "${dbSchemaName}"."${tablename as string}" CASCADE;`
      )
    }
    for (const { relname } of (await prisma.$queryRawUnsafe(
      `SELECT c.relname FROM pg_class AS c JOIN pg_namespace AS n ON c.relnamespace = n.oid WHERE c.relkind='S' AND n.nspname='${dbSchemaName}';`
    )) as any) {
      await prisma.$queryRawUnsafe(
        `ALTER SEQUENCE "${dbSchemaName}"."${
          relname as string
        }" RESTART WITH 1;`
      )
    }
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * Rests the database completely.
 *
 * Erases all data currently in the database, and then fills the database with the seeded data.
 */
export async function resetToSeed(): Promise<void> {
  await truncate()
  await seed()
}
