import { EnvironmentContext } from '@jest/environment'
import { Config } from '@jest/types'
import NodeEnvironment from 'jest-environment-node'
import 'reflect-metadata'

export default class CustomEnvironment extends NodeEnvironment {
  readonly isIntegrationTest: boolean
  constructor(config: Config.ProjectConfig, context?: EnvironmentContext) {
    super(config)
    this.isIntegrationTest = context?.testPath?.endsWith('test.ts') ?? false
  }

  async setup(): Promise<void> {
    // Register reflect-metadata
    this.global.Reflect = Reflect

    this.global.isIntegrationTest = this.isIntegrationTest

    await super.setup()
  }

  async teardown(): Promise<void> {
    await super.teardown()
  }
}
