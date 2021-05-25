<template>
  <div>
    <Portal to="header">
      <Logo class="mx-auto h-20 w-auto" />
      <h2 class="mt-8 text-center text-5xl font-extrabold text-gray-900">
        Change Password
      </h2>
    </Portal>
    <form @submit.prevent="changePassword">
      <div class="space-y-5">
        <t-input-group label="New Password" varient="important">
          <PasswordInput v-model="newPassword" />
        </t-input-group>
        <t-input-group label="Confirm Password" variant="important">
          <PasswordInput v-model="confirmPassword" />
        </t-input-group>
      </div>
      <div class="py-2">
        <t-button class="w-full" type="submit">Change Password</t-button>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import { ref } from '@vue/composition-api'
import { gql } from 'graphql-tag'
import { useChangePasswordMutation } from '../../apollo/graphql'
export default defineComponent({
  name: 'ChangePassword',
  layout: 'bare',
  setup() {
    const token = ''
    const newPassword = ref('')
    const confirmPassword = ref('')
    gql`
      mutation ChangePassword($token: String!, $newPassword: String!) {
        changePassword(token: $token, newPassword: $newPassword) {
          id
        }
      }
    `
    const {
      mutate: changePassword,
      onDone,
      error,
    } = useChangePasswordMutation(() => ({
      variables: {
        token: '22b2f6da-6895-40e5-b858-e2174232bbe7',
        newPassword: newPassword.value,
      },
    }))
    const router = useRouter()
    onDone(() => {
      router.push('/dashboard')
    })
    return { token, newPassword, error, changePassword, confirmPassword }
  },
})
</script>
