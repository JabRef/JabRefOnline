import { Meta, Story } from '@storybook/vue3'
import { TInputGroup } from '@variantjs/vue'

export default {
  component: TInputGroup,
  title: 't-input-group',
  args: {
    label: 'Label',
    feedback: 'Feedback',
    value: 'Input text',
  },
} as Meta

const Template: Story = (args) => ({
  setup() {
    return { args }
  },
  template:
    '<t-input-group :label="args.label" :variant="args.variant" :feedback="args.feedback"><t-input :variant="args.variant" :value="args.value"/></t-input-group>',
})
export const Default = Template.bind({})
export const Error = Template.bind({})
Error.args = {
  variant: 'error',
  label: 'Label',
  feedback: 'Feedback',
  value: 'Input text',
}
export const Success = Template.bind({})
Success.args = {
  variant: 'success',
  label: 'Label',
  feedback: 'Feedback',
  value: 'Input text',
}
export const Important = Template.bind({})
Important.args = {
  variant: 'plain',
  label: 'Label',
  feedback: 'Feedback',
  value: 'Input text',
}
