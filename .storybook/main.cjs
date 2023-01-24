module.exports = {
  // Need to specify stories as workaround for https://github.com/storybookjs/storybook/issues/20761
  stories: ['../components/*.stories.ts'],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
}
