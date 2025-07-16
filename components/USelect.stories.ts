import type { Meta, StoryFn } from '@storybook/vue3'

export default {
  title: 'UI/USelect',
  component: 'USelect',
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
    }
  }
} as Meta

const Template: StoryFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<USelect v-bind="args" v-model="args.value" />'
})

export const Default = Template.bind({})
Default.args = {
  options: ['React', 'Vue', 'Svelte', 'Angular'],
  placeholder: 'Select a framework'
}

export const WithLabels = Template.bind({})
WithLabels.args = {
  options: [
    { label: 'React', value: 'react' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Angular', value: 'angular' }
  ],
  placeholder: 'Select a framework'
}

export const Sizes = () => ({
  template: `
    <div class="space-y-4">
      <USelect size="xs" :options="['Extra Small']" placeholder="Extra Small" />
      <USelect size="sm" :options="['Small']" placeholder="Small" />
      <USelect size="md" :options="['Medium']" placeholder="Medium" />
      <USelect size="lg" :options="['Large']" placeholder="Large" />
      <USelect size="xl" :options="['Extra Large']" placeholder="Extra Large" />
    </div>
  `
})

export const Searchable = () => ({
  template: `
    <USelect 
      :options="['React', 'Vue', 'Svelte', 'Angular', 'Solid', 'Qwik', 'Lit']" 
      placeholder="Search framework..."
      searchable
    />
  `
})

export const Multiple = () => ({
  template: `
    <USelect 
      :options="['React', 'Vue', 'Svelte', 'Angular']" 
      placeholder="Select frameworks..."
      multiple
    />
  `
})

export const WithIcon = () => ({
  template: `
    <USelect :options="['Settings', 'Profile', 'Logout']" placeholder="Account">
      <template #leading>
        <Icon name="heroicons:user-circle" />
      </template>
    </USelect>
  `
})

export const States = () => ({
  template: `
    <div class="space-y-4">
      <USelect :options="['Option 1', 'Option 2']" placeholder="Normal select" />
      <USelect :options="['Option 1', 'Option 2']" placeholder="Disabled select" disabled />
    </div>
  `
})