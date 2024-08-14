import type { Meta, StoryFn } from '@nuxtjs/storybook'
import { TInput } from '@variantjs/vue'

export default {
  component: TInput,
  title: 't-input',
  args: {
    value: 'Input text',
  },
} as Meta

// @ts-expect-error: story missing arg types
const Template: StoryFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-input v-bind="args" />',
})
export const Default = Template.bind({})
export const Error = Template.bind({})
Error.args = {
  variant: 'error',
}
export const Success = Template.bind({})
Success.args = {
  variant: 'success',
}
export const Plain = Template.bind({})
Plain.args = {
  variant: 'plain',
}
