# Testing with Prisma Mock

This document describes how `prisma-mock` is integrated into the JabRefOnline test suite.

## Overview

We use [`prisma-mock`](https://github.com/demonsters/prisma-mock) for mocking the Prisma database client in tests. This provides fast, isolated tests without requiring a real PostgreSQL database connection.

## Current Implementation

### Unit Tests ✅

**Status:** Fully implemented and working

Unit tests now use `prisma-mock` to create in-memory mock databases:

- **`server/journals/journal.service.spec.ts`** - Tests journal service with mocked data
- **`server/documents/user.document.service.spec.ts`** - Tests document service with mocked data

#### Key Features

1. **DMMF Generator**: We use a Prisma generator to export the database schema (DMMF - Data Model Meta Format) which is required by prisma-mock:

   ```prisma
   generator prismaMock {
     provider = "node /home/runner/work/JabRefOnline/JabRefOnline/node_modules/prisma-mock/prisma-dmmf-generator.mjs"
     output = "./generated/dmmf.ts"
   }
   ```

2. **Test Setup Pattern**:

   ```typescript
   import createPrismaMock from 'prisma-mock/client'
   import { mockDeep } from 'vitest-mock-extended'
   import { Prisma, type PrismaClient } from '../database'
   import * as dmmf from '../database/generated/dmmf'

   let prisma: PrismaClient

   beforeEach(() => {
     const mockClient = mockDeep<PrismaClient>()
     prisma = createPrismaMock(Prisma, {
       mockClient,
       datamodel: { enums: dmmf.enums, models: dmmf.models },
     })
     register('PrismaClient', { useValue: prisma })
   })
   ```

3. **Data Seeding**: Tests seed their own data using standard Prisma create operations:
   ```typescript
   await prisma.journal.create({ data: testJournal })
   ```

#### Benefits

- ⚡ **Fast**: No database I/O - tests run in milliseconds
- 🔒 **Isolated**: Each test gets a fresh mock database
- 🚀 **Simple**: No database setup or teardown required
- 🎯 **Focused**: Tests only what they need to test

### Integration Tests

**Status:** Still using real PostgreSQL database

Integration tests continue to use a real PostgreSQL database because they:

1. Test complex GraphQL queries with nested includes and relationships
2. Validate the full stack integration including actual database behavior
3. Require features that are not fully supported by prisma-mock yet

**Rationale:** Integration tests are meant to test the integration between components with real dependencies. Using a real database here is appropriate and aligns with integration testing best practices.

## Running Tests

```bash
# Run unit tests (uses prisma-mock)
pnpm test:unit

# Run integration tests (uses real PostgreSQL)
pnpm test:integration

# Run all tests
pnpm test
```

## Future Improvements

Potential areas for future work:

1. **Expand prisma-mock coverage**: As prisma-mock evolves and adds support for more complex query patterns, we could migrate more tests to use it.

2. **Hybrid approach for integration tests**: Some simpler integration tests could potentially use prisma-mock while keeping complex ones on real database.

3. **Custom mock implementations**: For specific use cases not supported by prisma-mock, we could create custom mock implementations.

## Generating DMMF

The DMMF (datamodel) is automatically generated when you run:

```bash
pnpm prisma:generate
```

This creates `server/database/generated/dmmf.ts` which contains the schema information needed by prisma-mock.

## Troubleshooting

### DMMF Generator Fails

If the Prisma generator fails, ensure the path to the generator is correct in `server/database/schema.prisma`. The path should be absolute as Prisma executes generators from different working directories.

### Tests Fail with Type Errors

Make sure to regenerate the Prisma client and DMMF after schema changes:

```bash
pnpm prisma:generate
```

### Mock Data Not Persisting

Remember that each `beforeEach` creates a fresh mock instance. If you need data to persist across tests within a suite, create the mock in `beforeAll` instead (though this is generally not recommended).

## References

- [prisma-mock GitHub Repository](https://github.com/demonsters/prisma-mock)
- [prisma-mock Documentation](https://github.com/demonsters/prisma-mock#readme)
- [Prisma Documentation](https://www.prisma.io/docs/)
