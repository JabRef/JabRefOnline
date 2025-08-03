// @ts-expect-error: not sure why nuxi typecheck fails for this
import type { Meta, StoryFnFn } from '@nuxtjs/storybook'
// @ts-expect-error: not yet compatible with 'bundler' module resolution
import { TButton } from '@variantjs/vue'

export default {
  component: TButton,
  title: 't-nuxtlink',
  args: {
    label: 'nuxtlink',
  },
} as Meta

// @ts-expect-error: story missing arg types
const Template: StoryFnFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-nuxtlinkd>{{args.label}}</t-nuxtlinkd>',
})
export const Default = Template.bind({})
