import { root } from '~/test/api-e2e/supertest'

it('Returns a valid version', async () => {
  const response = await root().get('/api/getLatestRelease')

  expect(response.statusCode).toBe(200)
  expect(response.get('content-type')).toContain('application/json')
  expect(response.text).toMatch(/^{\n {2}"version": "\d.\d"\n}$/)
})
