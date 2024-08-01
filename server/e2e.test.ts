import { root } from '~/test/api-e2e/supertest'

describe('index page', () => {
  it('is accessible', async () => {
    const response = await root().get('/')
    expect(response.statusCode).toBe(200)
  })
})

describe('download', () => {
  it('redirects to fosshub', async () => {
    const response = (await root().get('/download')) as unknown as {
      statusCode: number
      text: string
    }
    // Client side redirect uses meta refresh
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain('https://www.fosshub.com/JabRef.html')
  })
})
