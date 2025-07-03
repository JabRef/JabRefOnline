<template>
  <UForm
    :schema="signupSchema"
    :state="formData"
    @submit="onSubmit"
    class="space-y-4"
  >
    <UFormGroup label="Full Name" name="name">
      <UInput
        v-model="formData.name"
        placeholder="Enter your full name"
      />
    </UFormGroup>

    <UFormGroup label="Email Address" name="email">
      <UInput
        v-model="formData.email"
        type="email"
        placeholder="Enter your email address"
      />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput
        v-model="formData.password"
        type="password"
        placeholder="Create a password"
      />
    </UFormGroup>

    <UFormGroup label="Confirm Password" name="confirmPassword">
      <UInput
        v-model="formData.confirmPassword"
        type="password"
        placeholder="Confirm your password"
      />
    </UFormGroup>

    <UFormGroup name="agreeToTerms">
      <UCheckbox
        v-model="formData.agreeToTerms"
        label="I agree to the Terms of Service and Privacy Policy"
      />
    </UFormGroup>

    <UButton
      type="submit"
      class="w-full"
      size="lg"
      :loading="isSubmitting"
    >
      Create Account
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { z } from 'zod'

// Validation schema using Zod
const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Form state
const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
})

const isSubmitting = ref(false)

// Submit handler
async function onSubmit() {
  isSubmitting.value = true
  
  try {
    // Here you would typically call an API
    console.log('Form submitted:', formData)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message
    const toast = useToast()
    toast.add({
      title: 'Account created successfully!',
      description: 'Please check your email to verify your account.',
      color: 'green'
    })
    
    // Reset form
    Object.assign(formData, {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    })
  } catch (error) {
    const toast = useToast()
    toast.add({
      title: 'Error creating account',
      description: 'Please try again later.',
      color: 'red'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>