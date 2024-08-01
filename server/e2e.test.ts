import { fetch, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

describe('index page', async () => {
  await setup({ host: process.env.TEST_URL })
  it('is accessible', async () => {
    const response = await fetch('/')
    expect(response.status).toBe(200)
  })
})

describe('download', async () => {
  await setup({ host: process.env.TEST_URL })
  it('redirects to fosshub', async () => {
    const response = await fetch('/download')
    // Client side redirect uses meta refresh
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain('https://www.fosshub.com/JabRef.html')
  })
})
