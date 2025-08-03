// @ts-expect-error: not sure why nuxi typecheck fails for this
import type { Meta, StoryFnFn } from '@nuxtjs/storybook'
// @ts-expect-error: not yet compatible with 'bundler' module resolution
import { TTag } from '@variantjs/vue'

export default {
  component: TTag,
  title: 't-tag',
  args: {
    variant: 'badge',
    label: 'Hi there!',
  },
} as Meta

// @ts-expect-error: story missing arg types
const Template: StoryFnFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-tag :variant="args.variant">{{args.label}}</t-tag>',
})
export const Default = Template.bind({})
