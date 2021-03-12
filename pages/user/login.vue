<template>
  <div>
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full space-y-8 -mt-20">
        <div>
          <img
            class="mx-auto h-20 w-auto"
            src="https://www.jabref.org/img/JabRef-icon-256.png"
            alt="JabRef"
          />
          <h2 class="mt-8 text-center text-5xl font-extrabold text-gray-900">
            Sign in
          </h2>
          <p class="mt-8 text-center text-sm text-gray-600">
            Don't have an account?
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
        </div>
        <form action="#" method="POST">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div>
                <label
                  for="email"
                  class="block text-sm font-semibold text-gray-700"
                >
                  Email address
                </label>
                <div class="mt-1">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    ref="email"
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
                  <input
                    :type="showHiddenPassword ? 'password' : 'text'"
                    x-model="password"
                    name="password"
                    id="password"
                    class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border border-gray-300 placeholder-gray-400"
                  />
                  <div
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    <font-awesome-icon
                      class="text-gray-500"
                      :icon="showHiddenPassword ? 'eye' : 'eye-slash'"
                      @click="showHiddenPassword = !showHiddenPassword"
                    />
                  </div>
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
                  <label
                    for="remember_me"
                    class="ml-2 block text-sm text-gray-900"
                  >
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
                <hr
                  class="border-gray-300 text-gray-500 text-center text-base"
                  data-hr-content="or sign in with"
                  style="
                    --bg: white;
                    --p: 0 10px;
                    --trans-x: -50%;
                    --trans-y: -50%;
                  "
                />
              </div>
              <div class="pt-2 flex justify-center">
                <img
                  class="w-28"
                  id="orcidLogoFooter"
                  src="https://info.orcid.org/wp-content/uploads/2020/01/orcid-logo.png"
                  alt="ORCID"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
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
<style>
hr::after {
  background-color: var(--bg);
  content: attr(data-hr-content);
  padding: var(--p);
  position: absolute;
  transform: translate(var(--trans-x), var(--trans-y));
}
</style>
