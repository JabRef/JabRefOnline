import { fetch, setup } from '@nuxt/test-utils/e2e'

describe('index page', () => {
  setup({ endpoint: process.env.TEST_URL })
  it('is accessible', async () => {
    const response = await fetch('/')
    expect(response.status).toBe(200)
  })
})

describe('download', () => {
  setup({ endpoint: process.env.TEST_URL })
  it('redirects to fosshub', async () => {
    const response = await fetch('/download')
    expect(response.status).toBe(302)
    expect(response.headers.get('location')).toBe(
      'https://www.fosshub.com/JabRef.html',
    )
  })
})
