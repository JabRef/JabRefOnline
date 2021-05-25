<template>
  <div>
    <Portal to="header">
      <Logo class="mx-auto h-20 w-auto" />
      <h2 class="mt-8 text-center text-5xl font-extrabold text-gray-900">
        Reset Password
      </h2>
    </Portal>
    <div v-if="called">
      <h2>Email Sent</h2>
      <p>
        An email with instructions on how to reset your password has been sent
        to {{ email }}.
      </p>
    </div>
    <form v-else @submit.prevent="forgotPassword">
      <div class="space-y-5">
        <t-input-group label="Email address" variant="important">
          <t-input v-model="email" v-focus />
        </t-input-group>
        <div class="py-2">
          <t-button class="w-full" type="submit">Submit</t-button>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ref } from '@vue/composition-api'
import { gql } from 'graphql-tag'
import { useForgotPasswordMutation } from '../../apollo/graphql'

export default defineComponent({
  name: 'ForgotPassword',
  layout: 'bare',
  setup() {
    const email = ref('')
    gql`
      mutation ForgotPassword($email: String!) {
        forgotPassword(email: $email)
      }
    `
    const {
      mutate: forgotPassword,
      called,
      error,
    } = useForgotPasswordMutation(() => ({
      variables: {
        email: email.value,
      },
    }))
    // eslint-disable-next-line no-console
    return { email, error, called, forgotPassword }
  },
})
</script>
