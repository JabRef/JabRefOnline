/**
 * Plugin that adds checks if the user is logged in, and redirects her to the login page if not.
 */
export default defineNuxtRouteMiddleware(async (to, _from) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const { loggedIn } = useUserSession()
    if (!loggedIn.value) {
      return redirectToLogin()
    }
  }
})

async function redirectToLogin() {
  // TODO: Remember the intended url by appending something like ?redirect=context.route.fullPath
  return await navigateTo('/user/login')
}
