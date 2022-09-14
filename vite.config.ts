import fs from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

// Workaround for determining the aliases
// Taken from https://github.com/nuxt/framework/discussions/5379#discussioncomment-2942984
const nuxtTsConfig = fs.readFileSync('./.nuxt/tsconfig.json').toString()
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const tsConfigFormated = JSON.parse(
  nuxtTsConfig.replace(
    /\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g,
    (m, g) => (g ? '' : m)
  )
)

const r = (p: string) => resolve(__dirname, p)

export const alias: Record<string, string> = {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
Object.entries(tsConfigFormated.compilerOptions.paths).forEach(
  ([key, value]) => {
    // @ts-expect-error: value is an array
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    alias[key] = r(value[0])
  }
)

export default defineConfig({
  test: {
    alias,

    // Provide global API
    // https://vitest.dev/config/#globals
    globals: true,

    // TODO: Configure coverage
    // collectCoverageFrom: [
    //   '<rootDir>/components/**/*.vue',
    //   '<rootDir>/pages/**/*.vue',
    //   '<rootDir>/server/**/*.ts',
    // ],

    // Run before each test file
    // https://vitest.dev/config/#setupfiles
    setupFiles: ['test/global.setup.ts'],
  },
})
