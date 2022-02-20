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
    <h2 class="text-center text-5xl font-bold text-gray-900">Create account</h2>
    <p class="mt-6 mb-8 text-center text-sm text-gray-600">
      Already have an account?
      <t-nuxtlink to="/user/login">Sign in</t-nuxtlink>
    </p>
    <t-alert
      v-if="error"
      variant="error"
      class="mt-6 mb-6"
      :dismissible="false"
      show
    >
      {{ error }}
    </t-alert>
    <form @submit.prevent="signup()">
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
import { defineComponent, ref, computed } from '@vue/composition-api'
import { useRouter } from '#app'
import { cacheCurrentUser } from '~/apollo/cache'
import { useSignupMutation } from '~/types/graphql'

export default defineComponent({
  name: 'UserRegister',
  layout: 'bare',

  setup() {
    const email = ref('')
    const password = ref('')
    const otherError = ref('')

    const {
      mutate: signup,
      loading,
      error: graphqlError,
      onDone,
    } = useSignupMutation(() => ({
      variables: {
        email: email.value,
        password: password.value,
      },
    }))

    const router = useRouter()
    onDone((result) => {
      if (result.data?.signup?.__typename === 'UserReturned') {
        const { user } = result.data.signup
        cacheCurrentUser(user)
        void router.push('/dashboard')
      } else {
        cacheCurrentUser(null)
        otherError.value =
          result.data?.signup?.__typename === 'InputValidationProblem' &&
          result.data.signup.problems[0]
            ? result.data.signup.problems[0].message
            : 'Unknown error'
      }
    })
    const error = computed(() => graphqlError.value || otherError.value)

    return {
      error,
      email,
      password,
      loading,
      signup,
    }
  },
})
</script>
