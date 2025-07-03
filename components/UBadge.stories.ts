import type { Meta, StoryFn } from '@storybook/vue3'

export default {
  title: 'UI/UBadge',
  component: 'UBadge',
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft', 'subtle']
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg']
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
  template: '<UBadge v-bind="args">{{ args.label || "Badge" }}</UBadge>'
})

export const Default = Template.bind({})
Default.args = {
  label: 'Hi there!'
}

export const Variants = () => ({
  template: `
    <div class="space-x-2">
      <UBadge variant="solid">Solid</UBadge>
      <UBadge variant="outline">Outline</UBadge>
      <UBadge variant="soft">Soft</UBadge>
      <UBadge variant="subtle">Subtle</UBadge>
    </div>
  `
})

export const Colors = () => ({
  template: `
    <div class="space-x-2 space-y-2">
      <div class="space-x-2">
        <UBadge color="primary">Primary</UBadge>
        <UBadge color="gray">Gray</UBadge>
        <UBadge color="red">Red</UBadge>
        <UBadge color="orange">Orange</UBadge>
        <UBadge color="amber">Amber</UBadge>
      </div>
      <div class="space-x-2">
        <UBadge color="yellow">Yellow</UBadge>
        <UBadge color="lime">Lime</UBadge>
        <UBadge color="green">Green</UBadge>
        <UBadge color="emerald">Emerald</UBadge>
        <UBadge color="teal">Teal</UBadge>
      </div>
      <div class="space-x-2">
        <UBadge color="cyan">Cyan</UBadge>
        <UBadge color="sky">Sky</UBadge>
        <UBadge color="blue">Blue</UBadge>
        <UBadge color="indigo">Indigo</UBadge>
        <UBadge color="violet">Violet</UBadge>
      </div>
    </div>
  `
})

export const Sizes = () => ({
  template: `
    <div class="space-x-2 flex items-center">
      <UBadge size="xs">Extra Small</UBadge>
      <UBadge size="sm">Small</UBadge>
      <UBadge size="md">Medium</UBadge>
      <UBadge size="lg">Large</UBadge>
    </div>
  `
})

export const WithIcon = () => ({
  template: `
    <div class="space-x-2">
      <UBadge>
        <template #leading>
          <Icon name="heroicons:star-20-solid" />
        </template>
        Featured
      </UBadge>
      <UBadge variant="outline">
        New
        <template #trailing>
          <Icon name="heroicons:sparkles-20-solid" />
        </template>
      </UBadge>
    </div>
  `
})

export const Status = () => ({
  template: `
    <div class="space-x-2">
      <UBadge color="green" variant="soft">Active</UBadge>
      <UBadge color="yellow" variant="soft">Pending</UBadge>
      <UBadge color="red" variant="soft">Inactive</UBadge>
      <UBadge color="gray" variant="soft">Draft</UBadge>
    </div>
  `
})

export const Tags = () => ({
  template: `
    <div class="space-x-2 space-y-2">
      <div class="space-x-2">
        <UBadge variant="outline" color="blue">React</UBadge>
        <UBadge variant="outline" color="green">Vue.js</UBadge>
        <UBadge variant="outline" color="orange">Svelte</UBadge>
      </div>
      <div class="space-x-2">
        <UBadge variant="outline" color="red">Angular</UBadge>
        <UBadge variant="outline" color="purple">Nuxt</UBadge>
        <UBadge variant="outline" color="pink">Next.js</UBadge>
      </div>
    </div>
  `
})

export const Removable = () => ({
  template: `
    <div class="space-x-2">
      <UBadge variant="soft">
        JavaScript
        <template #trailing>
          <UButton variant="ghost" size="xs" icon="heroicons:x-mark-20-solid" />
        </template>
      </UBadge>
      <UBadge variant="soft" color="green">
        TypeScript
        <template #trailing>
          <UButton variant="ghost" size="xs" icon="heroicons:x-mark-20-solid" />
        </template>
      </UBadge>
    </div>
  `
})