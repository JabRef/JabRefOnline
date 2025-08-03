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
  it('downloads file from GitHub release', async () => {
    const response = await fetch('/download')
    // Client side redirect uses meta refresh
    expect(await response.text()).toContain(
      'url=https://github.com/JabRef/jabref/releases/download/',
    )
    expect(response.status).toBe(200)
  })
})
