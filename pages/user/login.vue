<template>
  <NuxtLayout name="bare">
    <template #side>
      <div class="flex flex-col">
        <img
          class="w-11/12 mx-auto"
          src="~/assets/undraw_book_lover_mkck.svg"
        />
        <div class="mt-7 mx-auto text-2xl">Stay on top of your literature!</div>
      </div>
    </template>
    <div>
      <h2 class="text-center text-5xl font-extrabold text-gray-900">Sign in</h2>
      <p class="mt-6 mb-8 text-center text-sm text-gray-600">
        Don't have an account?
        <t-nuxtlink to="/user/register">Sign up</t-nuxtlink>
      </p>
      <n-alert
        v-if="error"
        type="error"
        class="mb-4"
      >
        {{ error }}
      </n-alert>
      <n-form
        size="large"
        @submit="onSubmit"
      >
        <div class="space-y-2">
          <n-form-item
            label="Email address"
            label-style="font-weight: 600"
            :feedback="errors.email"
            :validation-status="errors.email ? 'error' : undefined"
          >
            <n-input
              v-model:value="email"
              v-focus
            />
          </n-form-item>
          <n-form-item
            label="Password"
            label-style="font-weight: 600"
            :feedback="errors.password"
            :validation-status="errors.password ? 'error' : undefined"
          >
            <n-input
              v-model:value="password"
              type="password"
              show-password-on="mousedown"
            />
          </n-form-item>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <n-checkbox v-model:checked="rememberLogin">
                Keep me logged in
              </n-checkbox>
            </div>

            <div class="text-sm">
              <t-nuxtlink to="./forgot-password"
                >Forgot your password?</t-nuxtlink
              >
            </div>
          </div>

          <div class="py-2 text-center">
            <n-button
              class="w-full"
              type="primary"
              attr-type="submit"
              >Sign in</n-button
            >
          </div>

          <div>
            <HorizontalRule content="or sign in with" />
          </div>
          <div class="pt-2 flex justify-center">
            <img
              id="orcidLogoFooter"
              class="w-28"
              src="~/assets/ORCID_logo.svg"
              alt="ORCID"
            />
          </div>
        </div>
      </n-form>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useMutation } from '@vue/apollo-composable'
import { gql } from '~/apollo'
import { cacheCurrentUser } from '~/apollo/cache'
import { LoginInputSchema } from '~/apollo/validation'

definePageMeta({ layout: false })

// TODO: Automatically go to home if already logged in
// middleware: 'guest',

const { handleSubmit, errors, useField } = useZodForm(LoginInputSchema())

const { value: email } = useField('email')
const { value: password } = useField('password')

const otherError = ref('')

const {
  mutate: loginUser,
  onDone,
  error: graphqlError,
} = useMutation(
  gql(/* GraphQL */ `
    mutation Login($input: LoginInput!) {
      login(input: $input) {
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
    update(cache, { data: login }) {
      if (login?.login?.__typename === 'UserReturned') {
        const { user } = login.login
        cacheCurrentUser(cache, user)
      } else {
        cacheCurrentUser(cache, null)
      }
    },
  })
)
onDone((result) => {
  if (result.data?.login?.__typename === 'UserReturned') {
    void navigateTo({ name: 'dashboard' })
  } else {
    otherError.value =
      result.data?.login?.__typename === 'InputValidationProblem' &&
      result.data.login.problems[0]
        ? result.data.login.problems[0].message
        : 'Unknown error'
  }
})
const error = computed(() => graphqlError.value || otherError.value)

// TODO: Implement remember login
const rememberLogin = ref(false)

const onSubmit = handleSubmit(async (values) => {
  await loginUser({ input: values })
})
</script>
