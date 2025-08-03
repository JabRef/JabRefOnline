// @ts-expect-error: not sure why nuxi typecheck fails for this
import type { Meta, StoryFnFn } from '@nuxtjs/storybook'
// @ts-expect-error: not yet compatible with 'bundler' module resolution
import { TCheckbox } from '@variantjs/vue'

export default {
  component: TCheckbox,
  title: 't-checkbox',
  args: {
    checked: true,
  },
} as Meta

// @ts-expect-error: story missing arg types
const Template: StoryFnFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-checkbox v-bind="args" checked />',
})

export const Default = Template.bind({})
Default.args = {
  checked: true,
}

export const Error = Template.bind({})
Error.args = {
  variant: 'error',
  checked: true,
}

export const Success = Template.bind({})
Success.args = {
  variant: 'success',
  checked: true,
}

export const Plain = Template.bind({})
Plain.args = {
  variant: 'plain',
  checked: true,
}
