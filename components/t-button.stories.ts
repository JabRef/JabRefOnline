import { Story, Meta } from '@storybook/vue3'
import { TButton } from '@variantjs/vue'

export default {
  component: TButton,
  title: 't-button',
  args: {
    label: 'Button',
  },
} as Meta

const Template: Story = (args) => ({
  setup() {
    return { args }
  },
  template: '<t-button :variant="args.variant">{{args.label}}</t-button>',
})

export const Default = Template.bind({})
Default.args = {}

export const Error = Template.bind({})
Error.args = {
  variant: 'error',
  label: 'error',
}

export const Success = Template.bind({})
Success.args = {
  variant: 'success',
  label: 'success',
}

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
  label: 'secondary',
}

export const Link = Template.bind({})
Link.args = {
  variant: 'link',
  label: 'Link',
}

export const Linkplain = Template.bind({})
Linkplain.args = {
  variant: 'linkplain',
  label: 'Linkplain',
}
