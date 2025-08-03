import type { Meta, StoryFn } from '@storybook/vue3'
// @ts-expect-error: not yet compatible with 'bundler' module resolution
import { TButton } from '@variantjs/vue'

export default {
  component: TButton,
  title: 't-nuxtlink',
  args: {
    label: 'nuxtlink',
  },
} as Meta

const Template: StoryFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-nuxtlinkd>{{args.label}}</t-nuxtlinkd>',
})
export const Default = Template.bind({})
