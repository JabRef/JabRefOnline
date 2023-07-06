import { defineVitestConfig } from 'nuxt-vitest/config'
import GithubActionsReporter from 'vitest-github-actions-reporter'

export default defineVitestConfig({
  // @ts-expect-error: for some reason 'test' is not defined in the type definition
  test: {
    // Provide global API
    // https://vitest.dev/config/#globals
    globals: true,

    // Run before each test file
    // https://vitest.dev/config/#setupfiles
    setupFiles: ['test/global.setup.ts'],

    // Code coverage
    // https://vitest.dev/config/#coverage and https://vitest.dev/guide/coverage.html
    coverage: {
      reporter: ['json', 'text'],
    },

    // Create annotations when tests fail in GitHub Actions
    reporters: process.env.GITHUB_ACTIONS
      ? ['default', new GithubActionsReporter()]
      : 'default',
  },
})
