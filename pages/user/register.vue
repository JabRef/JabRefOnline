<template>
  <div>
    <Portal to="side">
      <div class="flex flex-col">
        <img
          class="w-11/12 mx-auto transform flip-horizontal"
          src="~/assets/undraw_road_to_knowledge_m8s0.svg"
        />
        <div class="mt-7 mx-auto text-2xl">One last step!</div>
      </div>
    </Portal>
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
    <form @submit.prevent="signup">
      <div class="space-y-5">
        <t-input-group label="Email address" variant="important">
          <t-input v-model="email" v-focus />
        </t-input-group>
        <t-input-group
          label="Password"
          variant="important"
          feedback="Use 8 or more characters with a mix of letters, numbers and symbols"
        >
          <PasswordInput v-model="password" />
        </t-input-group>
        <div class="py-2">
          <t-button class="w-full" type="submit">Create your account</t-button>
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
</template>
<script lang="ts">
import { gql } from '@apollo/client/core'
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'
import { currentUserVar } from '~/apollo/cache'
import { SignupMutationDocument } from '~/apollo/graphql'

export default defineComponent({
  name: 'Register',
  layout: 'bare',

  setup() {
    const email = ref('')
    const password = ref('')

    gql`
      mutation SignupMutation(
        $signupEmail: EmailAddress!
        $signupPassword: String!
      ) {
        signup(email: $signupEmail, password: $signupPassword) {
          ... on UserReturned {
            user {
              id
              email
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
    `
    const {
      mutate: signup,
      onDone,
      error,
    } = useMutation(SignupMutationDocument, () => ({
      variables: {
        signupEmail: email.value,
        signupPassword: password.value,
      },
      update(_context, { data }) {
        currentUserVar(data?.signup ?? null)
      },
    }))
    const router = useRouter()
    onDone(() => {
      void router.push('/dashboard')
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
