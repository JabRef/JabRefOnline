// @ts-expect-error: not sure why nuxi typecheck fails for this
import type { Meta, StoryFnFn } from '@nuxtjs/storybook'
// @ts-expect-error: not yet compatible with 'bundler' module resolution
import { TTextarea } from '@variantjs/vue'

export default {
  component: TTextarea,
  title: 't-textarea',
  args: {
    value: 'Input text',
  },
} as Meta

// @ts-expect-error: story missing arg types
const Template: StoryFnFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-textarea v-bind="args" />',
})

export const Default = Template.bind({})
