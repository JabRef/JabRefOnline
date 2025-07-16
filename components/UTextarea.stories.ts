import type { Meta, StoryFn } from '@storybook/vue3'

export default {
  title: 'UI/UTextarea',
  component: 'UTextarea',
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'none']
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    color: {
      control: 'select',
      options: ['primary', 'gray', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
    },
    placeholder: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    },
    rows: {
      control: 'number'
    }
  }
} as Meta

const Template: StoryFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<UTextarea v-bind="args" v-model="args.value" />'
})

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Enter your message...',
  value: 'This is some example text in a textarea.',
  rows: 4
}

export const Sizes = () => ({
  template: `
    <div class="space-y-4">
      <UTextarea size="xs" placeholder="Extra Small" rows="2" />
      <UTextarea size="sm" placeholder="Small" rows="3" />
      <UTextarea size="md" placeholder="Medium" rows="4" />
      <UTextarea size="lg" placeholder="Large" rows="5" />
      <UTextarea size="xl" placeholder="Extra Large" rows="6" />
    </div>
  `
})

export const AutoResize = Template.bind({})
AutoResize.args = {
  placeholder: 'This textarea will auto-resize as you type...',
  autoresize: true
}

export const WithCounter = Template.bind({})
WithCounter.args = {
  placeholder: 'Write your bio (max 200 characters)...',
  maxlength: 200,
  rows: 4
}

export const States = () => ({
  template: `
    <div class="space-y-4">
      <UTextarea placeholder="Normal textarea" rows="3" />
      <UTextarea placeholder="Disabled textarea" disabled rows="3" />
      <UTextarea placeholder="Error state" color="red" rows="3" />
      <UTextarea placeholder="Success state" color="green" rows="3" />
    </div>
  `
})