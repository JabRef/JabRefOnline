import { defineVitestConfig } from '@nuxt/test-utils/config'
import GithubActionsReporter from 'vitest-github-actions-reporter'

export default defineVitestConfig({
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        // Enable decorators, workaround for https://github.com/unjs/nitro/issues/1380
        experimentalDecorators: true,
      },
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

    // Create annotations when tests fail in GitHub Actions
    reporters: process.env.GITHUB_ACTIONS
      ? ['default', new GithubActionsReporter()]
      : 'default',
  },
})
