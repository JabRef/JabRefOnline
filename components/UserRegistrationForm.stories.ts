import type { Meta, StoryFn } from '@storybook/vue3'
import UserRegistrationForm from './UserRegistrationForm.vue'

export default {
  title: 'Forms/UserRegistrationForm',
  component: UserRegistrationForm,
} as Meta

const Template: StoryFn = (args) => ({
  components: { UserRegistrationForm },
  setup() {
    return { args }
  },
  template: `
    <div class="max-w-md mx-auto p-6">
      <h2 class="text-2xl font-bold mb-6">Create Account</h2>
      <UserRegistrationForm v-bind="args" />
    </div>
  `
})

export const Default = Template.bind({})
Default.args = {}

export const WithInitialData = Template.bind({})
WithInitialData.args = {}
WithInitialData.parameters = {
  docs: {
    description: {
      story: 'Registration form with validation using Nuxt UI and Zod schema validation. Try submitting with invalid data to see the validation in action.'
    }
  }
}