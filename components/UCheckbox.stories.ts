import type { Meta, StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

export default {
  title: 'UI/UCheckbox',
  component: 'UCheckbox',
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'gray', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    disabled: {
      control: 'boolean'
    },
    indeterminate: {
      control: 'boolean'
    }
  }
} as Meta

const Template: StoryFn = (args) => ({
  setup() {
    return { args }
  },
  template: '<UCheckbox v-bind="args" v-model="args.checked">{{ args.label }}</UCheckbox>'
})

export const Default = Template.bind({})
Default.args = {
  label: 'Accept terms and conditions',
  checked: true
}

export const Unchecked = Template.bind({})
Unchecked.args = {
  label: 'Subscribe to newsletter',
  checked: false
}

export const Colors = () => ({
  template: `
    <div class="space-y-3">
      <div class="space-x-4">
        <UCheckbox color="primary" :model-value="true">Primary</UCheckbox>
        <UCheckbox color="red" :model-value="true">Red</UCheckbox>
        <UCheckbox color="green" :model-value="true">Green</UCheckbox>
        <UCheckbox color="blue" :model-value="true">Blue</UCheckbox>
      </div>
      <div class="space-x-4">
        <UCheckbox color="yellow" :model-value="true">Yellow</UCheckbox>
        <UCheckbox color="purple" :model-value="true">Purple</UCheckbox>
        <UCheckbox color="pink" :model-value="true">Pink</UCheckbox>
        <UCheckbox color="orange" :model-value="true">Orange</UCheckbox>
      </div>
    </div>
  `
})

export const Sizes = () => ({
  template: `
    <div class="space-x-4 flex items-center">
      <UCheckbox size="xs" :model-value="true">Extra Small</UCheckbox>
      <UCheckbox size="sm" :model-value="true">Small</UCheckbox>
      <UCheckbox size="md" :model-value="true">Medium</UCheckbox>
      <UCheckbox size="lg" :model-value="true">Large</UCheckbox>
      <UCheckbox size="xl" :model-value="true">Extra Large</UCheckbox>
    </div>
  `
})

export const States = () => ({
  template: `
    <div class="space-y-3">
      <UCheckbox :model-value="true">Checked</UCheckbox>
      <UCheckbox :model-value="false">Unchecked</UCheckbox>
      <UCheckbox :model-value="true" disabled>Checked & Disabled</UCheckbox>
      <UCheckbox :model-value="false" disabled>Unchecked & Disabled</UCheckbox>
      <UCheckbox :indeterminate="true">Indeterminate</UCheckbox>
    </div>
  `
})

export const WithoutLabel = () => ({
  template: `
    <div class="space-x-4">
      <UCheckbox :model-value="true" />
      <UCheckbox :model-value="false" />
      <UCheckbox :indeterminate="true" />
    </div>
  `
})

export const ErrorState = () => ({
  template: `
    <div class="space-y-2">
      <UCheckbox :model-value="false" color="red">
        I agree to the terms (required)
      </UCheckbox>
      <p class="text-red-500 text-sm">You must accept the terms to continue</p>
    </div>
  `
})

export const SuccessState = () => ({
  template: `
    <div class="space-y-2">
      <UCheckbox :model-value="true" color="green">
        Email verification completed
      </UCheckbox>
      <p class="text-green-500 text-sm">Your email has been successfully verified</p>
    </div>
  `
})

export const Group = () => ({
  setup() {
    const selectedFeatures = ref(['feature1', 'feature3'])
    return { selectedFeatures }
  },
  template: `
    <div>
      <h3 class="font-medium mb-3">Select Features:</h3>
      <div class="space-y-2">
        <UCheckbox value="feature1" v-model="selectedFeatures">
          Feature 1: Advanced Analytics
        </UCheckbox>
        <UCheckbox value="feature2" v-model="selectedFeatures">
          Feature 2: Real-time Collaboration
        </UCheckbox>
        <UCheckbox value="feature3" v-model="selectedFeatures">
          Feature 3: Priority Support
        </UCheckbox>
        <UCheckbox value="feature4" v-model="selectedFeatures">
          Feature 4: Custom Integrations
        </UCheckbox>
      </div>
      <p class="mt-3 text-sm text-gray-600">
        Selected: {{ selectedFeatures.join(', ') || 'None' }}
      </p>
    </div>
  `
})