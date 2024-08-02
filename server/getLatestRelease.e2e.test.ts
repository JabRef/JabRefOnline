import { fetch, setup } from '@nuxt/test-utils/e2e'
import type { InternalApi } from 'nitropack'
import { describe, expect, it } from 'vitest'
type GetLatestReleaseResponse = InternalApi['/api/getLatestRelease']['default']

await setup({ host: process.env.TEST_URL })

describe.runIf(process.env.GITHUB_REPO_TOKEN)('getLatestRelease', () => {
  it('returns a valid version', async () => {
    const response = await fetch('/api/getLatestRelease')

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('application/json')
    const { version } = JSON.parse(
      await response.text(),
    ) as GetLatestReleaseResponse
    expect(version).toMatch(/^\d.\d{1,2}$/)
  })
})
