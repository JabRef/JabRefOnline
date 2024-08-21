// @ts-expect-error: not sure why nuxi typecheck fails for this
import type { Meta, StoryFn } from '@nuxtjs/storybook'
import { TTextarea } from '@variantjs/vue'

export default {
  component: TTextarea,
  title: 't-textarea',
  args: {
    value: 'Input text',
  },
} as Meta

// @ts-expect-error: story missing arg types
const Template: StoryFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-textarea v-bind="args" />',
})

export const Default = Template.bind({})
