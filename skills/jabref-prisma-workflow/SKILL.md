---
name: jabref-prisma-workflow
description: Use when changing JabRef Online Prisma models, generated Prisma client types, database migrations, seed data, or database scripts.
---

# JabRef Online Prisma Workflow

JabRef Online uses PostgreSQL with Prisma. The Prisma schema root is the `server/` directory, configured in `prisma.config.ts`; domain models live in files such as `server/documents/schema.prisma`, `server/groups/schema.prisma`, and `server/user/schema.prisma`. Migrations live in `server/migrations/`.

## Workflow

1. Change the domain `schema.prisma` file under `server/<domain>/`.
2. For prototyping, run:

   ```bash
   pnpm prisma:push
   pnpm prisma:generate
   ```

3. Once the data model is ready to commit, create a migration:

   ```bash
   pnpm prisma:migrate:dev
   ```

4. If you only need to inspect the generated SQL before applying it, use:

   ```bash
   pnpm prisma:migrate:dev:create
   ```

5. Regenerate the Prisma client and other generated artifacts after schema work:

   ```bash
   pnpm generate
   ```

## Project Conventions

- Import Prisma types and the generated client from `server/database`, not directly from generated paths.
- Inject Prisma through the `PrismaClient` tsyringe token in services.
- Keep Prisma calls in service or database helper files, not in Vue components or GraphQL resolver aggregation code.
- Use `server/database/seed.ts` and `server/database/runSeed.ts` for seed behavior.
- Use `pnpm prisma:migrate:diff` to compare migrations with the current schema when checking drift.

## Boundaries

- Do not edit generated Prisma client output by hand.
- Do not create migrations for purely experimental schema changes until the model is finalized.
- Keep database-specific business rules in services when they depend on auth, validation, or domain behavior.
