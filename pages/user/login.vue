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
        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700">
            Email address
          </label>
          <div class="mt-1">
            <input
              id="email"
              ref="email"
              name="email"
              type="text"
              class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border border-gray-300 placeholder-gray-400"
            />
          </div>
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-semibold text-gray-700"
          >
            Password
          </label>
          <div class="mt-1 relative">
            <PasswordInput />
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
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
          <button
            type="submit"
            class="mt-1 group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
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
