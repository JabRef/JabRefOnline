import type { StorybookConfig } from '@storybook-vue/nuxt'

const config: StorybookConfig = {
  // Need to specify stories as workaround for https://github.com/storybookjs/storybook/issues/20761
  //stories: ['../components/*.stories.@(vue|ts)'],
  stories: ['../components/*.stories.@(ts)'],
  core: {
    disableTelemetry: true,
  },
  addons: ['storybook-vue-addon', '@chromatic-com/storybook'],
  framework: {
    name: '@storybook-vue/nuxt',
    options: {},
  },
}
export default config
