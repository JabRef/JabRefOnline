import { describe, expect, it } from 'vitest'
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
      headers: { location: string }
    }
    expect(response.statusCode).toBe(302)
    expect(response.headers.location).toBe(
      'https://www.fosshub.com/JabRef.html',
    )
  })
})
