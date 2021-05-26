// @ts-ignore: No typescript info available yet https://github.com/nuxt/nuxt.js/issues/7651
import { Nuxt, loadNuxt } from 'nuxt'

// TODO: This doesn't work, reflect metadata is still missing...
import '../api/tsyringe.config'
import 'reflect-metadata'

// Init Nuxt.js and start listening on localhost:5000
describe('Nuxt setup', () => {
  // We keep a reference to Nuxt so we can close
  // the server at the end of the test
  let nuxt: Nuxt = null
  beforeAll(async () => {
    // For some reason building nuxt from code doesn't work
    // so developers need to run `yarn build` before
    /*
    const nuxtForBuild = await loadNuxt({ for: 'build' })
    await build(nuxtForBuild)
    */
    const isDev = process.env.NODE_ENV !== 'production'
    nuxt = await loadNuxt({ for: isDev ? 'dev' : 'start' })
  })

  afterAll(() => {
    nuxt.close()
  })

  it('renders the dashboard correctly', async () => {
    const context = {}
    const { html } = await nuxt.renderRoute('/', context)
    expect(html).toMatchSnapshot()
  })
})
