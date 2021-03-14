<template>
  <div>
    <Portal to="header">
      <Logo class="mx-auto h-20 w-auto" />
      <h2 class="mt-8 text-center text-5xl font-extrabold text-gray-900">
        Sign in
      </h2>
      <p class="mt-8 text-center text-sm text-gray-600">
        Don't have an account?
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
          Sign up
        </a>
      </p>
    </Portal>
    <form action="#" method="POST">
      <div class="space-y-5">
        <t-input-group label="Email address" variant="important">
          <t-input ref="email" />
        </t-input-group>
        <t-input-group label="Password" variant="important">
          <PasswordInput />
        </t-input-group>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <t-checkbox id="remember_me" />
            <label for="remember_me" class="ml-2 block text-sm text-gray-900">
              Keep me logged in
            </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
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
            src="https://info.orcid.org/wp-content/uploads/2020/01/orcid-logo.png"
            alt="ORCID"
          />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Login',
  layout: 'bare',
  data() {
    return {
      showHiddenPassword: true,
      authDetails: {
        email: '',
        password: '',
      },
    }
  },
  mounted() {
    this.$refs.email.focus()
  },
  methods: {
    loginUser: function () {},
  },
}
</script>
