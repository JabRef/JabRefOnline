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
      <UAlert
        v-if="error"
        color="error"
        variant="solid"
        title="Error"
        :description="String(error)"
        class="mb-4"
      />
      <form
        class="space-y-4"
        @submit.prevent="onSubmit"
      >
        <div class="space-y-2">
          <UFormGroup
            label="Email address"
            :error="errors.email"
          >
            <UInput
              v-model="email"
              v-bind="emailAttrs"
              v-focus
              size="xl"
            />
          </UFormGroup>
          <UFormGroup
            label="Password"
            :error="errors.password"
          >
            <UInput
              v-model="password"
              v-bind="passwordAttrs"
              type="password"
              size="xl"
            />
          </UFormGroup>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <UCheckbox
                v-model="rememberLogin"
                label="Keep me logged in"
              />
            </div>

            <div class="text-sm">
              <t-nuxtlink to="./forgot-password"
                >Forgot your password?</t-nuxtlink
              >
            </div>
          </div>

          <div class="py-2 text-center">
            <UButton
              variant="solid"
              class="w-full"
              color="primary"
              type="submit"
              size="xl"
              >Sign in</UButton
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
      </form>
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

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: toTypedSchema(LoginInputSchema),
})
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const otherError = ref('')

const { mutate: loginUser, error: graphqlError } = useMutation(
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
  {
    update(cache, { data: login }) {
      if (login?.login?.__typename === 'UserReturned') {
        const { user } = login.login
        cacheCurrentUser(cache, user)
      } else {
        cacheCurrentUser(cache, null)
      }
    },
  },
)
const error = computed(() => graphqlError.value ?? otherError.value)

// TODO: Implement remember login
const rememberLogin = ref(false)

const onSubmit = handleSubmit(async (values) => {
  // Reset errors
  otherError.value = ''

  const result = await loginUser({ input: values })
  if (result?.data?.login?.__typename === 'UserReturned') {
    // Update user info
    const { fetch } = useUserSession()
    await fetch()

    await navigateTo({ name: 'dashboard' })
  } else {
    otherError.value =
      result?.data?.login?.__typename === 'InputValidationProblem' &&
      result.data.login.problems[0]
        ? result.data.login.problems[0].message
        : 'Unknown error'
  }
})
</script>
