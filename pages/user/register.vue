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
      <h2 class="text-center text-5xl font-extrabold text-gray-900">
        Create account
      </h2>
      <p class="mt-6 mb-8 text-center text-sm text-gray-600">
        Already have an account?
        <t-nuxtlink to="/user/login">Sign in</t-nuxtlink>
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
      <form @submit.prevent="signup()">
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
          <t-input-group
            label="Password"
            variant="important"
            feedback="Use 8 or more characters with a mix of letters, numbers and symbols"
          >
            <PasswordInput v-model="password" />
          </t-input-group>
          <div class="py-2 text-center">
            <n-button
              class="w-full"
              type="primary"
              attr-type="submit"
              >Create your account</n-button
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

<script lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { gql } from '~/apollo'
import { cacheCurrentUser } from '~/apollo/cache'
definePageMeta({ layout: false })
export default defineComponent({
  name: 'UserRegister',

  setup() {
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
            data?.signup?.__typename === 'UserReturned'
              ? data?.signup?.user
              : null
          )
        },
      })
    )
    onDone(() => {
      void navigateTo({ path: '/dashboard' })
    })

    return {
      error,
      email,
      password,
      signup,
    }
  },
})
</script>
