// @ts-expect-error: not sure why nuxi typecheck fails for this
import type { Meta, StoryFnFn } from '@nuxtjs/storybook'
// @ts-expect-error: not yet compatible with 'bundler' module resolution
import { TSelect } from '@variantjs/vue'

export default {
  component: TSelect,
  title: 't-select',
  args: {
    options: ['react', 'vue', 'Svelte', 'angular'],
    placeholder: 'Select a framework',
  },
} as Meta

// @ts-expect-error: story missing arg types
const Template: StoryFnFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-select v-bind="args" />',
})
export const Default = Template.bind({})
export const Plain = Template.bind({})
Plain.args = {
  variant: 'plain',
}
export const Plaincaps = Template.bind({})
Plaincaps.args = {
  variant: 'plaincaps',
}
