import type { Meta, StoryFn } from '@storybook/vue3'
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

const Template: StoryFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-tag :variant="args.variant">{{args.label}}</t-tag>',
})
export const Default = Template.bind({})
