import type { StorybookConfig } from '@storybook-vue/nuxt'

const config: StorybookConfig = {
  // Need to specify stories as workaround for https://github.com/storybookjs/storybook/issues/20761
  stories: ['../components/*.stories.@(vue|ts)'],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook-vue/nuxt',
    options: {},
  },
  addons: ['storybook-vue-addon'],
}

export default config
