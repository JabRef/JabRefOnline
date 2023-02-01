module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|vue)'],
  core: {
    // Disable telemetry collection
    disableTelemetry: true,
    // Use vite as builder
    builder: '@storybook/builder-vite',
  },
  addons: ['storybook-vue-addon'],
}
