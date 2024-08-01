import { fetch } from '@nuxt/test-utils/e2e'
import { expect, test } from 'vitest'

test.runIf(process.env.GITHUB_REPO_TOKEN)(
  'returns a valid version',
  async () => {
    const response = await fetch('/api/getLatestRelease')

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('application/json')
    expect(response.text).toMatch(/^\d.\d{1,2}$/)
  },
)
