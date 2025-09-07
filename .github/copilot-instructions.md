# JabRefOnline Development Instructions

JabRefOnline is a modern Nuxt.js web application serving as the homepage for JabRef (https://www.jabref.org/). It's built with Vue.js, TypeScript, GraphQL, Prisma, PostgreSQL, and Redis, featuring a complete full-stack architecture with database management, authentication, and content management.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Initial Setup

PostgreSQL and Redis services are automatically provided with pre-configured environment variables in the Copilot environment. The database is already created and seeded.
The dependencies are already installed.

### Build and Development Commands

**CRITICAL - Build Timeouts:**

- **NEVER CANCEL** build commands. Set timeout to 120+ minutes.
- Build takes 45-60 seconds normally but can take longer on first run.
- Always wait for builds to complete fully.

```bash
# Development server (NEVER CANCEL - takes 30+ seconds to start)
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


## Workflows

**Database Schema Development Workflow:**

1. **Prototyping Phase:**
   ```bash
   # Make changes to server/database/schema.prisma
   pnpm prisma:push            # Push changes to database (no migration)
   # Iterate and test changes
   ```

2. **Migration Creation:**
   ```bash
   pnpm prisma:migrate:dev     # Generate migration file from schema changes
   pnpm prisma:seed            # Re-seed if needed
   ```

**GraphQL Development:**

- Schema located at `server/schema.graphql`
- Resolvers in `server/resolvers.ts`
- Generated types automatically updated on file changes
- GraphQL endpoint: `http://localhost:3000/api`

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
2. Verify that it works in the browser
5. Run unit tests: `pnpm test:unit`
6. Test E2E with dev server running: `pnpm test:e2e`

### Scenario 3: Production Build Validation

1. Build application: `pnpm build`
2. Start production server: `pnpm start`
3. Verify application loads correctly
4. Test key navigation and functionality

## Technology Stack and Architecture

- **Frontend:** Nuxt.js 4, Vue.js 3, TypeScript
- **Styling:** Tailwind CSS, Naive UI components
- **Backend:** Nuxt server API, GraphQL with Apollo
- **Database:** PostgreSQL with Prisma ORM
- **Cache:** Redis for session storage
- **Testing:** Vitest for unit/integration/E2E tests
- **UI Development:** Storybook for component development

## Important Directory Structure

```
/server/              # Backend API, GraphQL resolvers, database models
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


## Pre-commit Checklist

Before committing changes, always run:

1. `pnpm test:unit` - All unit tests must pass
2. `pnpm build` - Must build successfully
3. `pnpm lint` - Fix any errors, warnings are acceptable
4. `pnpm typecheck` - Must pass without errors

The CI pipeline (.github/workflows/ci.yml) will fail if linting, type checking, building, or core tests fail.

## Development Servers and Ports

- **Main application:** http://localhost:3000 (dev server)
- **Storybook:** http://localhost:6006 (component development)
- **Prisma Studio:** http://localhost:5555 (database management)
- **Tailwind Viewer:** http://localhost:3000/\_tailwind/ (CSS utility viewer)

Always ensure ports are available before starting services. The development server includes hot reload and will automatically reflect code changes.
