import { Meta, Story } from '@storybook/vue3'
import { NButton } from 'naive-ui'

export default {
  component: NButton,
  title: 'n-button',
  args: {
    label: 'Button',
  },
} as Meta

const Template: Story = (args) => ({
  setup() {
    return { args }
  },
  components: { NButton },
  template: '<n-button :type="args.type">{{args.label}}</n-button>',
})

export const Default = Template.bind({})
Default.args = {}

export const Error = Template.bind({})
Error.args = {
  type: 'error',
  label: 'error',
}

export const Success = Template.bind({})
Success.args = {
  type: 'success',
  label: 'success',
}

export const Primary = Template.bind({})
Primary.args = {
  type: 'primary',
  label: 'primary',
}

export const Tertiary = Template.bind({})
Tertiary.args = {
  type: 'tertiary',
  label: 'tertiary',
}

export const Link: Story = () => ({
  components: { NButton },
  template: '<n-button text>Link</n-button>',
})
