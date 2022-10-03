import { root } from '~/test/api-e2e/supertest'

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
type GetLatestReleaseResponse = Awaited<
  ReturnType<typeof import('~/server/api/getLatestRelease').default>
>

it('Returns a valid version', async () => {
  const response = await root().get('/api/getLatestRelease')

  expect(response.statusCode).toBe(200)
  expect(response.get('content-type')).toContain('application/json')
  expect((response.body as GetLatestReleaseResponse).version).toMatch(/^\d.\d$/)
})
