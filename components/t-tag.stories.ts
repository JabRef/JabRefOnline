import { Story, Meta } from '@storybook/vue'
import { TTag } from 'vue-tailwind/dist/components'

export default {
  component: TTag,
  title: 't-tag',
  args: {
    variant: 'badge',
    label: 'Hi there!',
  },
} as Meta

const Template: Story = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-tag :variant="args.variant">{{args.label}}</t-tag>',
})
export const Default = Template.bind({})
