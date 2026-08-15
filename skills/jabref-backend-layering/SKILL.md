---
name: jabref-backend-layering
description: Use when implementing or reviewing JabRef Online backend behavior in GraphQL resolvers, services, validation, authorization, or Prisma data access.
---

# JabRef Online Backend Layering

Keep backend work in the existing Resolver -> Service -> Prisma shape.

## Responsibilities

1. Resolver layer: aggregate GraphQL data and adapt API inputs.
   - Domain resolvers live in `server/<domain>/resolvers.ts`.
   - Use generated resolver types from `#graphql/resolver`.
   - Keep resolvers thin: map GraphQL inputs, select the right service method, and implement field resolvers or union/interface `__resolveType` methods.
2. Service layer: own validation, authorization, and business logic.
   - Domain services live as `server/<domain>/*.service.ts`.
   - Inject dependencies with `@injectable()` and constructor `@inject(...)`.
   - Put user-scoped checks and mutation rules here rather than in Prisma calls spread across resolvers.
3. Prisma layer: own persistence.
   - Inject `PrismaClient` through tsyringe.
   - Keep query includes close to the service methods that need them.
   - Reuse helpers like `createInclude` patterns when shaping repeated Prisma payloads.

## Registration

When adding a service or resolver class:

1. Export it from the domain file.
2. Register it in `server/tsyringe.config.ts`.
3. Add it to the domain `resolvers()` return object if GraphQL needs it.
4. Merge it through `server/resolvers.ts` if adding a new domain resolver bundle.

## Validation

- Use helpers in `server/utils/validation.ts` for validated functions and resolvers.
- Use generated Zod validation schemas from GraphQL codegen when validating GraphQL-shaped input.
- Prefer explicit errors close to the service boundary for invalid domain actions.

## Testing

- Unit-test service behavior with mocked Prisma clients using `vitest-mock-extended`, following `server/documents/user.document.service.spec.ts`.
- Unit-test resolver mapping separately when the logic is not trivial.
- Use integration or e2e tests for behavior that depends on actual GraphQL execution, auth context, database state, or API routing.
