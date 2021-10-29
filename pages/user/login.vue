<template>
  <div>
    <Portal to="side">
      <div class="flex flex-col">
        <img
          class="w-11/12 mx-auto"
          src="~/assets/undraw_book_lover_mkck.svg"
        />
        <div class="mt-7 mx-auto text-2xl">Stay on top of your literature!</div>
      </div>
    </Portal>

    <h2 class="text-center text-5xl font-extrabold text-gray-900">Sign in</h2>
    <p class="mt-6 mb-8 text-center text-sm text-gray-600">
      Don't have an account?
      <t-nuxtlink to="/user/register">Sign up</t-nuxtlink>
    </p>
    <t-alert
      v-if="error"
      variant="error"
      class="mt-8"
      :dismissible="false"
      show
    >
      {{ error }}
    </t-alert>
    <form @submit.prevent="loginUser">
      <div class="space-y-5">
        <t-input-group label="Email address" variant="important">
          <t-input v-model="email" v-focus />
        </t-input-group>
        <t-input-group label="Password" variant="important">
          <PasswordInput v-model="password" />
        </t-input-group>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <t-checkbox id="remember_me" />
            <label for="remember_me" class="ml-2 block text-sm text-gray-900">
              Keep me logged in
            </label>
          </div>

          <div class="text-sm">
            <t-nuxtlink to="./forgot-password"
              >Forgot your password?</t-nuxtlink
            >
          </div>
        </div>

        <div class="py-2">
          <t-button class="w-full" type="submit">Sign in</t-button>
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
</template>
<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import { computed, ref } from '@vue/composition-api'
import { useMutation } from '@vue/apollo-composable'
import { gql } from '~/apollo'
import { cacheCurrentUser } from '~/apollo/cache'

export default defineComponent({
  name: 'UserLogin',
  layout: 'bare',

  // TODO: Automatically go to home if already loggin in
  // middleware: 'guest',

  setup() {
    const email = ref('')
    const password = ref('')
    const otherError = ref('')

    const {
      mutate: loginUser,
      onDone,
      error: graphqlError,
    } = useMutation(
      gql(/* GraphQL */ `
        mutation Login($email: EmailAddress!, $password: String!) {
          login(email: $email, password: $password) {
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
          email: email.value,
          password: password.value,
        },
        update(_cache, { data: login }) {
          if (login?.login?.__typename === 'UserReturned') {
            const { user } = login.login
            cacheCurrentUser(user)
          } else {
            cacheCurrentUser(null)
          }
        },
      })
    )
    const router = useRouter()
    onDone((result) => {
      if (result.data?.login?.__typename === 'UserReturned') {
        void router.push({ name: 'dashboard' })
      } else {
        otherError.value =
          result.data?.login?.__typename === 'InputValidationProblem' &&
          result.data.login.problems[0]
            ? result.data.login.problems[0].message
            : 'Unknown error'
      }
    })
    const error = computed(() => graphqlError.value || otherError.value)

    return { email, password, error, loginUser }
  },
})
</script>
