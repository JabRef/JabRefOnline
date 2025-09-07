# JabRefOnline Development Instructions

JabRefOnline is a modern Nuxt.js web application serving as the homepage for JabRef (https://www.jabref.org/). It's built with Vue.js, TypeScript, GraphQL, Prisma, PostgreSQL, and Redis, featuring a complete full-stack architecture with database management, authentication, and content management.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Environment Setup

**Copilot Environment (Automated):**
When running in the GitHub Copilot environment, PostgreSQL and Redis services are automatically provisioned with pre-configured environment variables:

- PostgreSQL: `postgres:postgres@localhost:5432/jabref`
- Redis: Available on port 6380
- Environment variables are pre-set

## Working Effectively

### Initial Setup

**In Copilot Environment (Automated Setup):**
PostgreSQL and Redis services are automatically provided with pre-configured environment variables. Simply run:

```bash
pnpm install                    # Takes ~14 seconds
pnpm prisma:migrate:dev         # Takes ~3 seconds
pnpm prisma:seed               # Takes ~2 seconds
```

### Build and Development Commands

**CRITICAL - Build Timeouts:**

- **NEVER CANCEL** build commands. Set timeout to 120+ minutes.
- Build takes 45-60 seconds normally but can take longer on first run.
- Always wait for builds to complete fully.

```bash
# Development server (NEVER CANCEL - takes 30+ seconds to start)
# Environment variables are automatically set in Copilot environment
pnpm dev                        # Runs on http://localhost:3000 - TIMEOUT: 120+ seconds

# Production build (NEVER CANCEL - takes 45-60 seconds)
pnpm build                      # TIMEOUT: 120+ seconds

# Production server (requires build first)
pnpm start                      # Runs on http://localhost:3000
```

### Testing Commands

**CRITICAL - Test Execution:**

- E2E tests **REQUIRE** development server running first
- Unit tests are independent and run quickly
- **NEVER CANCEL** test suites. Set timeout to 60+ minutes.

```bash
# Unit tests only (fast, independent)
pnpm test:unit                  # Takes ~11 seconds

# E2E tests (REQUIRES dev server running in separate terminal)
# Terminal 1: pnpm dev (keep running)
# Terminal 2:
export TEST_URL="http://localhost:3000"
pnpm test:e2e                   # Takes ~13 seconds

# Integration tests
pnpm test:integration           # Takes ~15 seconds

# All tests (some will fail if dev server not running)
pnpm test                       # Takes ~13 seconds - TIMEOUT: 60+ seconds
```

### Quality Assurance Commands

```bash
# Linting (comprehensive check)
pnpm lint                       # Takes ~30 seconds - warnings expected, no errors

# Type checking
pnpm typecheck                  # Takes ~22 seconds

# GraphQL validation
pnpm validate                   # Takes ~1.5 seconds
```

### Additional Development Tools

```bash
# Storybook UI components (NEVER CANCEL - takes 7+ seconds to start)
pnpm storybook                  # Runs on http://localhost:6006 - TIMEOUT: 120+ seconds

# Database visual editor
pnpm prisma:studio              # Runs on http://localhost:5555

# Database operations
pnpm prisma:push                # Push schema changes to dev DB
pnpm prisma:migrate:dev         # Create and apply new migration
```

## Validation Scenarios

**ALWAYS manually validate changes using these complete user scenarios:**

### Scenario 1: Basic Homepage Functionality

1. Start development server: `pnpm dev`
2. Navigate to http://localhost:3000
3. Verify homepage loads with "Stay on top of your Literature" heading
4. Test navigation: click "Features" link
5. Verify page scrolls to #features section
6. Check browser console for critical errors (warnings are expected)

### Scenario 2: Full Development Workflow

1. Make code changes to components or pages
2. Verify hot reload works in browser
3. Run linting: `pnpm lint`
4. Run type checking: `pnpm typecheck`
5. Run unit tests: `pnpm test:unit`
6. Test E2E with dev server running: `pnpm test:e2e`

### Scenario 3: Production Build Validation

1. Build application: `pnpm build`
2. Start production server: `pnpm start`
3. Verify application loads correctly
4. Test key navigation and functionality

## Technology Stack and Architecture

- **Frontend:** Nuxt.js 3.15.0, Vue.js 3, TypeScript
- **Styling:** Tailwind CSS, Naive UI components
- **Backend:** Nuxt server API, GraphQL with Apollo
- **Database:** PostgreSQL with Prisma ORM
- **Cache:** Redis for session storage
- **Testing:** Vitest for unit/integration/E2E tests
- **UI Development:** Storybook for component development
- **Package Manager:** pnpm 10.15.1
- **Node.js:** 22.19.0

## Important Directory Structure

```
/server/               # Backend API, GraphQL resolvers, database models
/pages/               # Nuxt.js route pages
/components/          # Vue.js reusable components
/layouts/             # Page layout templates
/content/             # Markdown content files
/assets/              # Uncompiled assets (CSS, images)
/public/              # Static files served directly
/apollo/              # GraphQL client configuration
/test/                # Test utilities and setup
/.github/workflows/   # CI/CD pipeline configuration
```

## Common Issues and Solutions

**Module Compatibility Warnings:**

- Warnings about `nuxtseo` and `@bg-dev/nuxt-naiveui` are expected due to Nuxt version
- These do not affect functionality

**Database Connection Issues:**

- Ensure PostgreSQL is running: `sudo systemctl status postgresql`
- Verify database URL in `.env` matches your setup
- Check user permissions for creating databases (required for Prisma shadow DB)

**Redis Connection Issues:**

- Ensure Redis is running: `sudo systemctl status redis-server`
- In Copilot environment: Redis runs on port 6380 (mapped from container port 6379)

**Build Failures:**

- Always set environment variables before building
- Ensure database is accessible during build (for prerendering)
- Allow sufficient time - builds can take 45+ seconds

**Test Failures:**

- E2E tests require development server running first
- Set `TEST_URL=http://localhost:3000` environment variable
- Database must be seeded for tests to pass

## Pre-commit Checklist

Before committing changes, always run:

1. `pnpm lint` - Fix any errors, warnings are acceptable
2. `pnpm typecheck` - Must pass without errors
3. `pnpm test:unit` - All unit tests must pass
4. `pnpm build` - Must build successfully
5. Test key user scenarios manually

The CI pipeline (.github/workflows/ci.yml) will fail if linting, type checking, building, or core tests fail.

## Development Servers and Ports

- **Main application:** http://localhost:3000 (dev server)
- **Storybook:** http://localhost:6006 (component development)
- **Prisma Studio:** http://localhost:5555 (database management)
- **Tailwind Viewer:** http://localhost:3000/\_tailwind/ (CSS utility viewer)

Always ensure ports are available before starting services. The development server includes hot reload and will automatically reflect code changes.
