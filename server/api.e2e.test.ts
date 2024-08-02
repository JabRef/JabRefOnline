import { fetch, setup } from '@nuxt/test-utils'
import { gql as gqlNotVerified } from 'graphql-tag'
import { describe, expect, it } from 'vitest'
import { api } from '~/test/api-e2e/supertest'

describe('invalid query', async () => {
  await setup({ host: process.env.TEST_URL })
  it('returns an error', async () => {
    const { errors, rawResponse } = await api().query({
      query: gqlNotVerified`
          query WrongQueryE2E($id: String) {
            user(id: $id) {
              id
              # eslint-disable-next-line @graphql-eslint/fields-on-correct-type
              name
            }
          }
        `,
      variables: { id: '' },
    })

    expect(rawResponse.status).toBe(400)
    expect(rawResponse.headers.get('content-type')).toContain(
      'application/json',
    )
    expect(errors?.map((error) => error.message)).toMatchInlineSnapshot(`
      [
        "Cannot query field "name" on type "User".",
        "Variable "$id" of type "String" used in position expecting type "ID!".",
      ]
    `)
  })
})

describe('request without query', async () => {
  await setup({ host: process.env.TEST_URL })
  it('returns an error', async () => {
    const response = await fetch('/api', {
      headers: { 'Apollo-Require-Preflight': 'True' },
    })

    expect(response.text).toContain(
      'GraphQL operations must contain a non-empty `query`',
    )
    expect(response.status).toBe(400)
  })
})

describe('preflight', async () => {
  await setup({ host: process.env.TEST_URL })
  it('works', async () => {
    const response = await fetch('/api', {
      headers: {
        Origin: 'https://studio.apollographql.com',
        'Access-Control-Request-Method': 'POST',
      },
    })

    expect(response.body).toStrictEqual({})
    expect(response.status).toBe(204)
    expect(response.headers.get('access-control-allow-methods')).toBe(
      'GET,POST,OPTIONS',
    )
    expect(response.headers.get('access-control-allow-origin')).toBe(
      'https://studio.apollographql.com',
    )
    expect(response.headers.get('access-control-allow-headers')).toBe(
      'Content-Type',
    )
  })

  it('works on route with slash', async () => {
    const response = await fetch('/api/', {
      headers: {
        Origin: 'https://studio.apollographql.com',
        'Access-Control-Request-Method': 'POST',
      },
    })

    expect(response.body).toStrictEqual({})
    expect(response.status).toBe(204)
    expect(response.headers.get('access-control-allow-methods')).toBe(
      'GET,POST,OPTIONS',
    )
    expect(response.headers.get('access-control-allow-origin')).toBe(
      'https://studio.apollographql.com',
    )
    expect(response.headers.get('access-control-allow-headers')).toBe(
      'Content-Type',
    )
  })
})
