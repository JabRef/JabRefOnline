<template>
  <NuxtLayout name="bare">
    <template #side>
      <img
        class="w-11/12 mx-auto"
        src="~/assets/undraw_join_of2w.svg"
      />
    </template>
    <div>
      <h2 class="mb-7 text-center text-5xl font-extrabold text-highlighted">
        Reset Password
      </h2>
      <p
        v-if="called"
        class="text-base"
      >
        An email with instructions on how to reset your password has been sent
        to {{ email }}.
      </p>
      <form
        v-else
        @submit.prevent="forgotPassword()"
      >
        <div class="space-y-5">
          <UFormField
            label="Email address"
            required
          >
            <UInput
              v-model="email"
              v-focus
            />
          </UFormField>
          <div class="py-2 text-center">
            <UButton
              class="w-full"
              type="submit"
              size="xl"
              >Submit</UButton
            >
          </div>
        </div>
      </form>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { gql } from '~/apollo'

definePageMeta({ layout: false })

const email = ref('')
const { mutate: forgotPassword, called } = useMutation(
  gql(/* GraphQL */ `
    mutation ForgotPassword($input: ForgotPasswordInput!) {
      forgotPassword(input: $input) {
        result
      }
    }
  `),
  () => ({
    variables: {
      input: {
        email: email.value,
      },
    },
  }),
)
</script>
