<template>
  <div>
    <Portal to="header">
      <Logo class="mx-auto h-20 w-auto" />
      <h2 class="mt-8 text-center text-5xl font-extrabold text-gray-900">
        Create account
      </h2>
      <p class="mt-8 text-center text-sm text-gray-600">
        Already have an account?
        <t-nuxtlink to="/user/login">Sign in</t-nuxtlink>
      </p>
      <t-alert
        v-if="error !== ''"
        variant="error"
        class="mt-8"
        :dismissible="false"
        show
      >
        {{ error }}
      </t-alert>
    </Portal>
    <form @submit.prevent="registerUser">
      <div class="space-y-5">
        <t-input-group label="Email address" variant="important">
          <t-input ref="email" v-model="authDetails.email" />
        </t-input-group>
        <t-input-group
          label="Password"
          variant="important"
          feedback="Use 8 or more characters with a mix of letters, numbers and symbols"
        >
          <PasswordInput v-model="authDetails.password" />
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
import { gql } from 'graphql-tag'

export default {
  name: 'Register',
  layout: 'bare',
  data() {
    return {
      error: '',
      authDetails: {
        email: '',
        password: '',
      },
    }
  },
  mounted(): void {
    // @ts-ignore: Currently no more type information avaliable
    this.$refs.email.focus()
  },
  methods: {
    registerUser(): void {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($email: String!, $password: String!) {
              signup(email: $email, password: $password) {
                id
              }
            }
          `,
          variables: {
            ...this.authDetails,
          },
        })
        .then((response) => {
          localStorage.setItem('app-token', response.data.signup)
          this.$router.push('/dashboard')
        })
        .catch((error) => {
          this.error = error.message
        })
    },
  },
}
</script>
