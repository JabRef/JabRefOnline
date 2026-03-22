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
  it('downloads latest from GitHub release', async () => {
    const response = await fetch('/download', { redirect: 'manual' })
    expect(await response.text()).toContain(
      'url=https://github.com/JabRef/jabref/releases/latest',
    )
    expect(response.status).toBe(302) // Redirect
  })
  it('downloads file from GitHub release when os is specified', async () => {
    const response = await fetch('/download/win_msi', { redirect: 'manual' })
    const text = await response.text()
    expect(text).toContain(
      'url=https://github.com/JabRef/jabref/releases/download',
    )
    expect(text).toContain('.msi')
    expect(response.status).toBe(302) // Redirect
  })
})
