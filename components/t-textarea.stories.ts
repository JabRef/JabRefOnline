import type { Meta, StoryFn } from '@storybook/vue3'
// @ts-expect-error: not yet compatible with 'bundler' module resolution
import { TTextarea } from '@variantjs/vue'

export default {
  component: TTextarea,
  title: 't-textarea',
  args: {
    value: 'Input text',
  },
} as Meta

const Template: StoryFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-textarea v-bind="args" />',
})

export const Default = Template.bind({})
