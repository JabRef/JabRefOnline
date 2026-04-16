import { defineConfig } from 'vitest/config'

export default defineConfig({
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        // Enable decorators, workaround for https://github.com/unjs/nitro/issues/1380
        experimentalDecorators: true,
      },
    },
  },
  resolve: {
    // Workaround for https://github.com/nuxt/test-utils/issues/1408
    alias: {
      '~/': new URL(`./`, import.meta.url).pathname,
      '#graphql/schema': new URL(`.nuxt/graphql-schema.mjs`, import.meta.url)
        .pathname,
    },
  },
  test: {
    // Run before each test file
    // https://vitest.dev/config/#setupfiles
    setupFiles: ['test/global.setup.ts'],

    // Code coverage
    // https://vitest.dev/config/#coverage and https://vitest.dev/guide/coverage.html
    coverage: {
      reporter: ['json', 'text'],
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          isolate: false,
          sequence: {
            groupOrder: 0,
          },
          include: ['**/**spec.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'integration',
          include: ['**/**integration.test.ts'],
          maxWorkers: 1,
          sequence: {
            groupOrder: 1,
          },
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          isolate: false,
          include: ['**/**e2e.test.ts'],
          maxWorkers: 1,
          hookTimeout: 400000,
          sequence: {
            groupOrder: 2,
          },
        },
      },
    ],
  },
})
