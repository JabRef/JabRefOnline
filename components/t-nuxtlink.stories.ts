import type { Meta, StoryFn } from '@nuxtjs/storybook'
import { TButton } from '@variantjs/vue'

export default {
  component: TButton,
  title: 't-nuxtlink',
  args: {
    label: 'nuxtlink',
  },
} as Meta

// @ts-expect-error: story missing arg types
const Template: StoryFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-nuxtlinkd>{{args.label}}</t-nuxtlinkd>',
})
export const Default = Template.bind({})
