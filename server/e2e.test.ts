import { gql as gqlNotVerified } from 'graphql-tag'
import { api, root } from '~/test/api-e2e/supertest'

describe('Invalid query', () => {
  it('Returns an error', async () => {
    const { errors, response } = await api()
      .query(
        gqlNotVerified`
          query WrongQueryE2E($id: String) {
            user(id: $id) {
              id
              # eslint-disable-next-line @graphql-eslint/fields-on-correct-type
              name
            }
          }
        `
      )
      .variables({ id: '' })

    expect(response.statusCode).toBe(400)
    expect(response.get('content-type')).toContain('application/json')
    expect(errors?.map((error) => error.message)).toMatchInlineSnapshot(`
      [
        "Cannot query field \\"name\\" on type \\"User\\".",
        "Variable \\"$id\\" of type \\"String\\" used in position expecting type \\"ID!\\".",
      ]
    `)
  })
})

describe('Request without query', () => {
  it('Returns an error', async () => {
    const response = await root()
      .get('/api')
      .set('Apollo-Require-Preflight', 'True')

    expect(response.statusCode).toBe(400)
    expect(response.text).toContain(
      'GraphQL operations must contain a non-empty `query`'
    )
  })
})

describe('Preflight', () => {
  it('works', async () => {
    const response = await root()
      .options('/api')
      .set('Origin', 'https://studio.apollographql.com')
      .set('Access-Control-Request-Method', 'POST')

    expect(response.body).toStrictEqual({})
    expect(response.statusCode).toBe(204)
    expect(response.get('access-control-allow-methods')).toBe(
      'GET,POST,OPTIONS'
    )
    expect(response.get('access-control-allow-origin')).toBe(
      'https://studio.apollographql.com'
    )
    expect(response.get('access-control-allow-headers')).toBe('Content-Type')
  })

  it('works on route with slash', async () => {
    const response = await root()
      .options('/api/')
      .set('Origin', 'https://studio.apollographql.com')
      .set('Access-Control-Request-Method', 'POST')

    expect(response.body).toStrictEqual({})
    expect(response.statusCode).toBe(204)
    expect(response.get('access-control-allow-methods')).toBe(
      'GET,POST,OPTIONS'
    )
    expect(response.get('access-control-allow-origin')).toBe(
      'https://studio.apollographql.com'
    )
    expect(response.get('access-control-allow-headers')).toBe('Content-Type')
  })
})
