import type { Meta, StoryFn } from '@storybook/vue3'

export default {
  title: 'UI/UInput',
  component: 'UInput',
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
    loading: {
      control: 'boolean'
    }
  }
} as Meta

const Template: StoryFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<UInput v-bind="args" v-model="args.value" />'
})

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Enter text...',
  value: 'Input text'
}

export const Error = Template.bind({})
Error.args = {
  placeholder: 'Enter text...',
  value: 'Input text',
  color: 'red'
}

export const Success = Template.bind({})
Success.args = {
  placeholder: 'Enter text...',
  value: 'Input text',
  color: 'green'
}

export const Sizes = () => ({
  template: `
    <div class="space-y-4">
      <UInput size="xs" placeholder="Extra Small" />
      <UInput size="sm" placeholder="Small" />
      <UInput size="md" placeholder="Medium" />
      <UInput size="lg" placeholder="Large" />
      <UInput size="xl" placeholder="Extra Large" />
    </div>
  `
})

export const WithIcon = () => ({
  template: `
    <div class="space-y-4">
      <UInput placeholder="Search...">
        <template #leading>
          <Icon name="heroicons:magnifying-glass" />
        </template>
      </UInput>
      <UInput placeholder="Email address">
        <template #trailing>
          <Icon name="heroicons:envelope" />
        </template>
      </UInput>
    </div>
  `
})

export const States = () => ({
  template: `
    <div class="space-y-4">
      <UInput placeholder="Normal input" />
      <UInput placeholder="Disabled input" disabled />
      <UInput placeholder="Loading input" loading />
    </div>
  `
})