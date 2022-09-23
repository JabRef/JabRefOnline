import { addPluginTemplate, defineNuxtModule } from '@nuxt/kit'
type Redirect = { from: string; to: string; external?: boolean }

// For some reason nuxt converts an array as module option to an object of the form { 0: '...', 1: '...' }
export type ModuleOptions = {
  [key: string]: Redirect
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    configKey: 'redirects',
  },
  setup(moduleOptions, _nuxt) {
    addPluginTemplate({
      filename: 'redirects.mjs',
      write: true, // for easier debugging
      getContents: () => `
      import { createRouter } from 'radix3'
      export default defineNuxtPlugin(nuxt => {
        const redirects = createRouter()
        const moduleOptions = ${JSON.stringify(moduleOptions)}
        Object.values(moduleOptions).forEach(({ from, to, external }) => {
          redirects.insert(from, { to, external })
        })
        addRouteMiddleware((to, _from) => {
          const redirect = redirects.lookup(to.path)
          if (redirect) {
            return navigateTo(redirect.to, { external: redirect.external })
          }
        })
      })`,
    })
  },
})
