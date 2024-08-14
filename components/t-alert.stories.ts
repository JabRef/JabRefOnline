// @ts-expect-error: not sure why nuxi typecheck fails for this
import type { Meta, StoryFn } from '@nuxtjs/storybook'
import { TAlert } from '@variantjs/vue'

export default {
  component: TAlert,
  title: 't-alert',
  args: {
    show: true,
    message: 'Hi there!',
  },
} as Meta

// @ts-expect-error: story missing arg types
const Template: StoryFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-alert v-bind="args">{{args.message}}</t-alert>',
})
export const Default = Template.bind({})
export const Error = Template.bind({})
Error.args = {
  variant: 'error',
  message: 'oops!',
  show: true,
}
export const Success = Template.bind({})
Success.args = {
  variant: 'success',
  message: 'success!',
  show: true,
}
