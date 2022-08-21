import { Meta, Story } from '@storybook/vue3'
import { TSelect } from '@variantjs/vue'

export default {
  component: TSelect,
  title: 't-select',
  args: {
    options: ['react', 'vue', 'Svelte', 'angular'],
    placeholder: 'Select a framework',
  },
} as Meta

const Template: Story = (args) => ({
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
