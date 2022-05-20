import { Story, Meta } from '@storybook/vue'
import { TTextarea } from 'vue-tailwind/dist/components'

export default {
  component: TTextarea,
  title: 't-textarea',
  args: {
    value: 'Input text',
  },
} as Meta

const Template: Story = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-textarea v-bind="args" />',
})

export const Default = Template.bind({})
