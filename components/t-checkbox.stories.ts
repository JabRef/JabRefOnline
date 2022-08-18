import { Meta, Story } from '@storybook/vue3'
import { TCheckbox } from '@variantjs/vue'

export default {
  component: TCheckbox,
  title: 't-checkbox',
  args: {
    checked: true,
  },
} as Meta

const Template: Story = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-checkbox v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
  checked: true,
}

export const Error = Template.bind({})
Error.args = {
  variant: 'error',
  checked: true,
}

export const Success = Template.bind({})
Success.args = {
  variant: 'success',
  checked: true,
}

export const Plain = Template.bind({})
Plain.args = {
  variant: 'plain',
  checked: true,
}
