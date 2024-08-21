import type { StorybookConfig } from '@nuxtjs/storybook'

const config: StorybookConfig = {
  // Need to specify stories as workaround for https://github.com/storybookjs/storybook/issues/20761
  stories: ['../components/*.stories.@(vue|ts)'],
  core: {
    // @ts-expect-error - need to update storybook types
    disableTelemetry: true,
  },
  addons: ['storybook-vue-addon', '@chromatic-com/storybook'],
  framework: {
    name: '@storybook-vue/nuxt',
    options: {},
  },
}
export default config
