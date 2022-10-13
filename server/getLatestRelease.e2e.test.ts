import { InternalApi } from 'nitropack'
import { root } from '~/test/api-e2e/supertest'

type GetLatestReleaseResponse = InternalApi['/api/getLatestRelease']

test.runIf(process.env.GITHUB_REPO_TOKEN)(
  'Returns a valid version',
  async () => {
    const response = await root().get('/api/getLatestRelease')

    expect(response.statusCode).toBe(200)
    expect(response.get('content-type')).toContain('application/json')
    expect((response.body as GetLatestReleaseResponse).version).toMatch(
      /^\d.\d$/
    )
  }
)
