import { gql } from 'graphql-tag'
import { api, login } from '~/test/api-e2e/supertest'

describe('Mutation', () => {
  describe('Login', () => {
    it('Sets the cookie', async () => {
      const { data, response } = await api()
        .mutate(
          gql`
            mutation LoginE2E($input: LoginInput!) {
              login(input: $input) {
                ... on UserReturned {
                  user {
                    id
                  }
                }
              }
            }
          `
        )
        .variables({
          input: { email: 'alice@jabref.org', password: 'EBNPXY35TYkYXHs' },
        })
        .expectNoErrors()

      // TODO: Check that there is even a session cookie
      expect(response.get('set-cookie')).toBeDefined()
      expect(data).toStrictEqual({
        login: { user: { id: 'ckn4oul7100004cv7y3t94n8j' } },
      })
    })
  })
})

describe('Query', () => {
  describe('Me', () => {
    it('Returns the user when logged in', async () => {
      const request = api()
      await login(request)
      const { data } = await request
        .query(
          gql`
            query MeE2E {
              me {
                id
              }
            }
          `
        )
        .expectNoErrors()

      expect(data).toStrictEqual({
        me: { id: 'ckn4oul7100004cv7y3t94n8j' },
      })
    })
  })
  it('Returns nothing when not logged in', async () => {
    const { data } = await api()
      .query(
        gql`
          query MeE2ENotLoggedIn {
            me {
              id
            }
          }
        `
      )
      .expectNoErrors()

    expect(data).toStrictEqual({
      me: null,
    })
  })
})
