import type { Meta, StoryFn } from '@nuxtjs/storybook'
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
const Template: StoryFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-tag :variant="args.variant">{{args.label}}</t-tag>',
})
export const Default = Template.bind({})
