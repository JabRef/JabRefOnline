import type { Meta, StoryFn } from '@storybook/vue3'

export default {
  title: 'UI/UAlert',
  component: 'UAlert',
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft', 'subtle']
    },
    color: {
      control: 'select',
      options: ['primary', 'gray', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
    },
    title: {
      control: 'text'
    },
    description: {
      control: 'text'
    },
    closable: {
      control: 'boolean'
    }
  }
} as Meta

const Template: StoryFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<UAlert v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  title: 'Information',
  description: 'Hi there! This is an informational alert.'
}

export const Error = Template.bind({})
Error.args = {
  title: 'Error',
  description: 'Oops! Something went wrong.',
  color: 'red',
  icon: 'heroicons:exclamation-circle'
}

export const Success = Template.bind({})
Success.args = {
  title: 'Success',
  description: 'Your action was completed successfully!',
  color: 'green',
  icon: 'heroicons:check-circle'
}

export const Warning = Template.bind({})
Warning.args = {
  title: 'Warning',
  description: 'Please review the information before proceeding.',
  color: 'yellow',
  icon: 'heroicons:exclamation-triangle'
}

export const Variants = () => ({
  template: `
    <div class="space-y-4">
      <UAlert variant="solid" title="Solid Alert" description="This is a solid alert variant." />
      <UAlert variant="outline" title="Outline Alert" description="This is an outline alert variant." />
      <UAlert variant="soft" title="Soft Alert" description="This is a soft alert variant." />
      <UAlert variant="subtle" title="Subtle Alert" description="This is a subtle alert variant." />
    </div>
  `
})

export const WithActions = () => ({
  template: `
    <UAlert
      title="Update Available"
      description="A new version of the application is available."
      color="blue"
      icon="heroicons:arrow-down-tray"
    >
      <template #actions>
        <UButton variant="solid" color="blue" size="xs">Update</UButton>
        <UButton variant="ghost" color="blue" size="xs">Later</UButton>
      </template>
    </UAlert>
  `
})

export const Closable = () => ({
  template: `
    <UAlert
      title="Dismissible Alert"
      description="Click the close button to dismiss this alert."
      closable
    />
  `
})

export const WithoutTitle = () => ({
  template: `
    <div class="space-y-4">
      <UAlert description="This alert only has a description." />
      <UAlert description="This is an error message." color="red" icon="heroicons:exclamation-circle" />
      <UAlert description="This is a success message." color="green" icon="heroicons:check-circle" />
    </div>
  `
})

export const CustomIcon = () => ({
  template: `
    <div class="space-y-4">
      <UAlert
        title="Custom Icon"
        description="This alert uses a custom icon."
        icon="heroicons:light-bulb"
        color="yellow"
      />
      <UAlert
        title="Security Alert"
        description="Your password will expire soon."
        icon="heroicons:shield-exclamation"
        color="red"
      />
    </div>
  `
})

export const Colors = () => ({
  template: `
    <div class="space-y-4">
      <UAlert title="Primary" description="Primary color alert" color="primary" />
      <UAlert title="Red" description="Red color alert" color="red" />
      <UAlert title="Green" description="Green color alert" color="green" />
      <UAlert title="Blue" description="Blue color alert" color="blue" />
      <UAlert title="Yellow" description="Yellow color alert" color="yellow" />
      <UAlert title="Purple" description="Purple color alert" color="purple" />
    </div>
  `
})