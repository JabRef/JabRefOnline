import { root } from '~/test/api-e2e/supertest'

describe('index page', () => {
  it('is accessible', async () => {
    const response = await root().get('/')
    expect(response.statusCode).toBe(200)
  })
})
