import { setup } from '@nuxt/test-utils'
import { gql } from 'graphql-tag'
import { describe, expect, it, test } from 'vitest'
import { api, login } from '~/test/api-e2e/graphqlClient'
import { getEmail, getTemporaryEmail } from '~/test/email'

describe('mutation', async () => {
  await setup({ host: process.env.TEST_URL })
  describe('login', () => {
    it('sets the cookie', async () => {
      const { data, errors, rawResponse } = await api().mutate({
        mutation: gql`
          mutation LoginE2E($input: LoginInput!) {
            login(input: $input) {
              ... on UserReturned {
                user {
                  id
                }
              }
              ... on InputValidationProblem {
                problems {
                  path
                  message
                }
              }
            }
          }
        `,
        variables: {
          input: { email: 'alice@jabref.org', password: 'EBNPXY35TYkYXHs' },
        },
      })
      expect(errors).toEqual(undefined)
      expect(data).toStrictEqual({
        login: { user: { id: 'ckn4oul7100004cv7y3t94n8j' } },
      })
      // TODO: Check that there is even a session cookie
      expect(rawResponse.headers.get('set-cookie')).toBeDefined()
    })
  })
  describe('signup', () => {
    const email = getTemporaryEmail()
    test.runIf(process.env.EMAIL_CLIENT)(
      `sends an email to the address ${email}`,
      async () => {
        console.log('Creating account with email', email)
        const { data, errors } = await api().mutate({
          mutation: gql`
            mutation SignupE2E($input: SignupInput!) {
              signup(input: $input) {
                ... on UserReturned {
                  user {
                    id
                  }
                }
                ... on InputValidationProblem {
                  problems {
                    path
                    message
                  }
                }
              }
            }
          `,
          variables: {
            input: {
              email,
              password: 'EBNPXY35TYkYXHs',
            },
          },
        })
        expect(errors).toEqual(undefined)
        expect(data).toMatchInlineSnapshot(
          {
            signup: { user: { id: expect.any(String) } },
          },
          `
            {
              "signup": {
                "user": {
                  "id": Any<String>,
                },
              },
            }
          `,
        )

        const receivedEmail = await getEmail(email)
        expect(receivedEmail.subject).toEqual(
          'Welcome! Confirm your email and get started',
        )
      },
      15000,
    )
  })
})

describe('query', async () => {
  await setup({ host: process.env.TEST_URL })
  describe('me', () => {
    it('returns the user when logged in', async () => {
      const request = api()
      await login(request)
      const { data, errors } = await request.query({
        query: gql`
          query MeE2E {
            me {
              id
            }
          }
        `,
      })
      expect(errors).toEqual(undefined)
      expect(data).toStrictEqual({
        me: { id: 'ckn4oul7100004cv7y3t94n8j' },
      })
    })
    it('returns nothing when not logged in', async () => {
      const { data, errors } = await api().query({
        query: gql`
          query MeE2ENotLoggedIn {
            me {
              id
            }
          }
        `,
      })
      expect(errors).toEqual(undefined)
      expect(data).toStrictEqual({
        me: null,
      })
    })
  })
})
