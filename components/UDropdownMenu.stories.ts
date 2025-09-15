import type { Meta, StoryFn } from '@storybook/vue3'

export default {
  title: 'UI/UDropdownMenuMenu',
  component: 'UDropdownMenuMenu',
  argTypes: {
    mode: {
      control: 'select',
      options: ['click', 'hover']
    },
    disabled: {
      control: 'boolean'
    }
  }
} as Meta

const Template: StoryFn = (args) => ({
  setup() {
    return { args }
  },
  template: `
    <UDropdownMenuMenu v-bind="args">
      <UButton>
        {{ args.triggerText || 'Dropdown' }}
        <Icon name="heroicons:chevron-down-20-solid" class="w-4 h-4 ml-2" />
      </UButton>
    </UDropdownMenuMenu>
  `
})

export const Default = Template.bind({})
Default.args = {
  items: [
    [{
      label: 'Your Profile',
      icon: 'heroicons:user-20-solid',
      click: () => console.log('Profile clicked')
    }],
    [{
      label: 'Settings',
      icon: 'heroicons:cog-6-tooth-20-solid',
      click: () => console.log('Settings clicked')
    }],
    [{
      label: 'Sign out',
      icon: 'heroicons:arrow-right-start-on-rectangle-20-solid',
      click: () => console.log('Sign out clicked')
    }]
  ],
  triggerText: 'Account'
}

export const WithDividers = () => ({
  setup() {
    const items = [
      [{
        label: 'Profile',
        icon: 'heroicons:user-20-solid'
      }, {
        label: 'Settings',
        icon: 'heroicons:cog-6-tooth-20-solid'
      }],
      [{
        label: 'Help',
        icon: 'heroicons:question-mark-circle-20-solid'
      }, {
        label: 'Feedback',
        icon: 'heroicons:chat-bubble-left-right-20-solid'
      }],
      [{
        label: 'Sign out',
        icon: 'heroicons:arrow-right-start-on-rectangle-20-solid'
      }]
    ]
    
    return { items }
  },
  template: `
    <UDropdownMenu :items="items">
      <UButton>
        Menu
        <Icon name="heroicons:chevron-down-20-solid" class="w-4 h-4 ml-2" />
      </UButton>
    </UDropdownMenu>
  `
})

export const HoverMode = () => ({
  setup() {
    const items = [
      [{
        label: 'Documentation',
        icon: 'heroicons:book-open-20-solid'
      }, {
        label: 'Guides',
        icon: 'heroicons:academic-cap-20-solid'
      }, {
        label: 'API Reference',
        icon: 'heroicons:code-bracket-20-solid'
      }]
    ]
    
    return { items }
  },
  template: `
    <UDropdownMenu :items="items" mode="hover">
      <UButton>
        Resources
        <Icon name="heroicons:chevron-down-20-solid" class="w-4 h-4 ml-2" />
      </UButton>
    </UDropdownMenu>
  `
})

export const CustomTrigger = () => ({
  setup() {
    const items = [
      [{
        label: 'Edit',
        icon: 'heroicons:pencil-square-20-solid'
      }, {
        label: 'Duplicate',
        icon: 'heroicons:document-duplicate-20-solid'
      }, {
        label: 'Delete',
        icon: 'heroicons:trash-20-solid'
      }]
    ]
    
    return { items }
  },
  template: `
    <UDropdownMenu :items="items">
      <UButton variant="ghost" icon="heroicons:ellipsis-horizontal-20-solid" />
    </UDropdownMenu>
  `
})

export const WithShortcuts = () => ({
  setup() {
    const items = [
      [{
        label: 'New File',
        icon: 'heroicons:document-plus-20-solid',
        shortcuts: ['⌘', 'N']
      }, {
        label: 'Open',
        icon: 'heroicons:folder-open-20-solid',
        shortcuts: ['⌘', 'O']
      }],
      [{
        label: 'Save',
        icon: 'heroicons:floppy-disk-20-solid',
        shortcuts: ['⌘', 'S']
      }]
    ]
    
    return { items }
  },
  template: `
    <UDropdownMenu :items="items">
      <UButton>
        File
        <Icon name="heroicons:chevron-down-20-solid" class="w-4 h-4 ml-2" />
      </UButton>
    </UDropdownMenu>
  `
})

export const States = () => ({
  setup() {
    const items = [
      [{
        label: 'Option 1'
      }, {
        label: 'Option 2'
      }]
    ]
    
    return { items }
  },
  template: `
    <div class="space-x-4">
      <UDropdownMenu :items="items">
        <UButton>Normal</UButton>
      </UDropdownMenu>
      <UDropdownMenu :items="items" disabled>
        <UButton disabled>Disabled</UButton>
      </UDropdownMenu>
    </div>
  `
})