import type { Meta, StoryFn } from '@storybook/vue3'

export default {
  title: 'UI/UButton',
  component: 'UButton',
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft', 'ghost', 'link']
    },
    size: {
      control: 'select', 
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    color: {
      control: 'select',
      options: ['primary', 'gray', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
    }
  }
} as Meta

const Template: StoryFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<UButton v-bind="args">{{ args.label || "Button" }}</UButton>'
})

export const Default = Template.bind({})
Default.args = {
  label: 'Button'
}

export const Primary = Template.bind({})
Primary.args = {
  label: 'Primary Button',
  color: 'primary'
}

export const Variants = () => ({
  template: `
    <div class="space-y-4">
      <div class="space-x-2">
        <UButton variant="solid">Solid</UButton>
        <UButton variant="outline">Outline</UButton>
        <UButton variant="soft">Soft</UButton>
        <UButton variant="ghost">Ghost</UButton>
        <UButton variant="link">Link</UButton>
      </div>
    </div>
  `
})

export const Sizes = () => ({
  template: `
    <div class="space-x-2 flex items-center">
      <UButton size="xs">Extra Small</UButton>
      <UButton size="sm">Small</UButton>
      <UButton size="md">Medium</UButton>
      <UButton size="lg">Large</UButton>
      <UButton size="xl">Extra Large</UButton>
    </div>
  `
})

export const WithIcon = () => ({
  template: `
    <div class="space-x-2">
      <UButton>
        <template #leading>
          <Icon name="heroicons:plus" />
        </template>
        Add Item
      </UButton>
      <UButton>
        Download
        <template #trailing>
          <Icon name="heroicons:arrow-down-tray" />
        </template>
      </UButton>
    </div>
  `
})

export const Loading = () => ({
  template: `
    <div class="space-x-2">
      <UButton loading>Loading</UButton>
      <UButton loading disabled>Loading Disabled</UButton>
    </div>
  `
})