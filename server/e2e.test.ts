import { fetch, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

await setup({ host: process.env.TEST_URL })

describe('index page', () => {
  it('is accessible', async () => {
    const response = await fetch('/')
    expect(response.status).toBe(200)
  })
})

describe('download', () => {
  it('redirects to fosshub', async () => {
    const response = await fetch('/download')
    // Client side redirect uses meta refresh
    expect(response.status).toBe(200)
    expect(await response.text()).toContain(
      'https://www.fosshub.com/JabRef.html',
    )
  })
})
