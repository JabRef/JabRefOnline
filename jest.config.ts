import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/server/**/*.ts',
  ],
  snapshotSerializers: ['<rootDir>/test/snapshot.graphql.cjs'],
  testEnvironment: '<rootDir>/test/testenv.ts',
  setupFilesAfterEnv: ['<rootDir>/test/global.setup.ts'],
  preset: 'ts-jest/presets/default-esm',
  globals: {
    'ts-jest': { useESM: true },
  },
  // GitHub Actions Reporter will annotate changed files with test failure messages on PRs
  reporters: ["default", "github-actions"],
}

export default config
