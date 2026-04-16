<template>
  <NuxtLayout name="bare">
    <template #side>
      <div class="flex flex-col">
        <img
          class="w-11/12 mx-auto transform flip-horizontal"
          src="~/assets/undraw_road_to_knowledge_m8s0.svg"
        />
        <div class="mt-7 mx-auto text-2xl">One last step!</div>
      </div>
    </template>
    <div>
      <h2 class="text-center text-5xl font-extrabold text-highlighted">
        Create account
      </h2>
      <p class="mt-6 mb-8 text-center text-sm text-toned">
        Already have an account?
        <t-nuxtlink to="/user/login">Sign in</t-nuxtlink>
      </p>
      <UAlert
        v-if="error"
        color="error"
        title="Error"
        :description="String(error)"
        class="mt-8"
      />
      <form @submit.prevent="signup()">
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
          <UFormField
            label="Password"
            required
            help="Use 8 or more characters with a mix of letters, numbers and symbols"
          >
            <PasswordInput v-model="password" />
          </UFormField>
          <div class="py-2 text-center">
            <UButton
              class="w-full"
              type="submit"
              size="xl"
              >Create your account</UButton
            >
          </div>
          <div>
            <HorizontalRule content="or sign up with" />
          </div>
          <div class="pt-2 flex justify-center">
            <img
              id="orcidLogoFooter"
              class="w-28"
              src="https://info.orcid.org/wp-content/uploads/2020/01/orcid-logo.png"
              alt="ORCID"
            />
          </div>
        </div>
      </form>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { gql } from '~/apollo'
import { cacheCurrentUser } from '~/apollo/cache'

definePageMeta({ layout: false })

const email = ref('')
const password = ref('')

const {
  mutate: signup,
  onDone,
  error,
} = useMutation(
  gql(/* GraphQL */ `
    mutation Signup($input: SignupInput!) {
      signup(input: $input) {
        ... on UserReturned {
          user {
            id
          }
        }
        ... on InputValidationProblem {
          problems {
            path
            message
          }
        }
      }
    }
  `),
  () => ({
    variables: {
      input: {
        email: email.value,
        password: password.value,
      },
    },
    update(cache, { data }) {
      cacheCurrentUser(
        cache,
        data?.signup?.__typename === 'UserReturned' ? data.signup.user : null,
      )
    },
  }),
)
onDone(() => {
  void navigateTo({ path: '/dashboard' })
})
</script>
