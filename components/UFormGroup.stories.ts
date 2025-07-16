import type { Meta, StoryFn } from '@storybook/vue3'

export default {
  title: 'UI/UFormGroup',
  component: 'UFormGroup',
  argTypes: {
    label: {
      control: 'text'
    },
    description: {
      control: 'text'
    },
    hint: {
      control: 'text'
    },
    error: {
      control: 'text'
    },
    required: {
      control: 'boolean'
    }
  }
} as Meta

const Template: StoryFn = (args) => ({
  setup() {
    return { args }
  },
  template: `
    <UFormGroup v-bind="args">
      <UInput :placeholder="args.placeholder || 'Enter value...'" />
    </UFormGroup>
  `
})

export const Default = Template.bind({})
Default.args = {
  label: 'Email Address',
  placeholder: 'Enter your email'
}

export const WithDescription = Template.bind({})
WithDescription.args = {
  label: 'Username',
  description: 'Choose a unique username for your account',
  placeholder: 'Enter username'
}

export const WithHint = Template.bind({})
WithHint.args = {
  label: 'Password',
  hint: 'Must be at least 8 characters',
  placeholder: 'Enter password'
}

export const Required = Template.bind({})
Required.args = {
  label: 'Full Name',
  required: true,
  placeholder: 'Enter your full name'
}

export const WithError = Template.bind({})
WithError.args = {
  label: 'Email',
  error: 'Please enter a valid email address',
  placeholder: 'Enter your email'
}

export const WithSuccess = () => ({
  template: `
    <UFormGroup 
      label="Email" 
      description="We'll use this to send you updates"
    >
      <UInput placeholder="Enter your email" color="green" />
    </UFormGroup>
  `
})

export const FormGroups = () => ({
  template: `
    <div class="space-y-6">
      <UFormGroup 
        label="First Name" 
        required
        description="Enter your legal first name"
      >
        <UInput placeholder="John" />
      </UFormGroup>

      <UFormGroup 
        label="Last Name" 
        required
        description="Enter your legal last name"
      >
        <UInput placeholder="Doe" />
      </UFormGroup>

      <UFormGroup 
        label="Email Address" 
        required
        hint="We'll never share your email"
      >
        <UInput type="email" placeholder="john@example.com" />
      </UFormGroup>

      <UFormGroup 
        label="Password" 
        required
        hint="Must be at least 8 characters with numbers and symbols"
      >
        <UInput type="password" placeholder="Enter password" />
      </UFormGroup>

      <UFormGroup 
        label="Bio" 
        description="Tell us a bit about yourself"
      >
        <UTextarea placeholder="Write your bio..." rows="4" />
      </UFormGroup>

      <UFormGroup 
        label="Country" 
        required
      >
        <USelect 
          :options="['United States', 'Canada', 'United Kingdom', 'Germany', 'France']" 
          placeholder="Select country"
        />
      </UFormGroup>

      <UFormGroup 
        label="Preferences"
        description="Choose your notification preferences"
      >
        <div class="space-y-2">
          <UCheckbox>Email notifications</UCheckbox>
          <UCheckbox>SMS notifications</UCheckbox>
          <UCheckbox>Push notifications</UCheckbox>
        </div>
      </UFormGroup>
    </div>
  `
})

export const WithTextarea = () => ({
  template: `
    <UFormGroup 
      label="Message" 
      description="Enter your message"
      hint="Maximum 500 characters"
    >
      <UTextarea placeholder="Type your message..." rows="4" />
    </UFormGroup>
  `
})

export const WithSelect = () => ({
  template: `
    <UFormGroup 
      label="Department" 
      required
      error="Please select a department"
    >
      <USelect 
        :options="['Engineering', 'Design', 'Marketing', 'Sales', 'Support']" 
        placeholder="Choose department"
      />
    </UFormGroup>
  `
})

export const NestedValidation = () => ({
  template: `
    <div class="space-y-4">
      <UFormGroup 
        label="Email" 
        error="This email is already taken"
      >
        <UInput type="email" placeholder="Enter email" color="red" />
      </UFormGroup>

      <UFormGroup 
        label="Password" 
        error="Password must contain at least one uppercase letter"
      >
        <UInput type="password" placeholder="Enter password" color="red" />
      </UFormGroup>

      <UFormGroup 
        label="Confirm Password" 
        error="Passwords do not match"
      >
        <UInput type="password" placeholder="Confirm password" color="red" />
      </UFormGroup>
    </div>
  `
})