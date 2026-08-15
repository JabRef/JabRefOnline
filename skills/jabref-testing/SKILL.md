---
name: jabref-testing
description: Use when adding or updating JabRef Online Vitest unit, integration, e2e, validation, resolver, service, or database tests.
---

# JabRef Online Testing

JabRef Online uses Vitest with colocated tests and project-specific test commands.

## File Placement

- Put focused unit tests beside the source as `*.spec.ts`.
  - Examples: `server/utils/crypto.spec.ts`, `server/utils/validation.spec.ts`, `server/documents/user.document.service.spec.ts`.
- Put integration tests beside the domain as `integration.test.ts`.
  - Examples: `server/user/integration.test.ts`, `server/documents/integration.test.ts`.
- Put e2e tests beside the feature or API area as `e2e.test.ts`.
  - Examples: `server/user/e2e.test.ts`, `server/api.e2e.test.ts`.
- Use shared helpers from `test/` when setting up Apollo, config, context, email, or database state.

## Commands

Run all tests:

```bash
pnpm test
```

Run a targeted project:

```bash
pnpm test:unit
pnpm test:integration
pnpm test:e2e
```

## Patterns

- Use `describe`, `it`, `expect`, and `beforeEach` from `vitest`.
- Use `vitest-mock-extended` for mocked Prisma clients in service unit tests.
- Reset mocks in `beforeEach`.
- Register tsyringe test doubles before resolving services that depend on them.
- Prefer e2e tests for GraphQL request behavior and auth/session boundaries.
- Prefer integration tests for database-backed service and resolver flows.

## Finishing Checks

- Run the smallest relevant test command while iterating.
- Run `pnpm test` when changes touch shared behavior, generated GraphQL types, auth, database, or resolver contracts.
- Run `pnpm lint` before handing off.
