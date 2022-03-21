<template>
  <div>
    <Portal to="side">
      <img
        class="w-11/12 mx-auto"
        src="~/assets/undraw_join_of2w.svg"
      />
    </Portal>
    <h2 class="mb-7 text-center text-5xl font-extrabold text-gray-900">
      Reset Password
    </h2>
    <div v-if="called">
      <h2>Email Sent</h2>
      <p>
        An email with instructions on how to reset your password has been sent
        to {{ email }}.
      </p>
    </div>
    <form
      v-else
      @submit.prevent="forgotPassword()"
    >
      <div class="space-y-5">
        <t-input-group
          label="Email address"
          variant="important"
        >
          <t-input
            v-model="email"
            v-focus
          />
        </t-input-group>
        <div class="py-2">
          <t-button
            class="w-full"
            type="submit"
            >Submit</t-button
          >
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { useMutation } from '@vue/apollo-composable'
import { gql } from '~/apollo'

export default defineComponent({
  name: 'ForgotPassword',
  layout: 'bare',
  setup() {
    const email = ref('')
    const {
      mutate: forgotPassword,
      called,
      error,
    } = useMutation(
      gql(/* GraphQL */ `
        mutation ForgotPassword($email: EmailAddress!) {
          forgotPassword(email: $email) {
            result
          }
        }
      `),
      () => ({
        variables: {
          email: email.value,
        },
      })
    )
    return { email, error, called, forgotPassword }
  },
})
</script>
