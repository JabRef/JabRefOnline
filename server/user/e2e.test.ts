import { gql } from 'graphql-tag'
import { test } from 'vitest'
import { api, login } from '~/test/api-e2e/supertest'
import { getEmail, getTemporaryEmail } from '~/test/email'

describe('mutation', () => {
  describe('login', () => {
    it('sets the cookie', async () => {
      const { data, response, errors } = await api()
        .mutate(gql`
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
        `)
        .variables({
          input: { email: 'alice@jabref.org', password: 'EBNPXY35TYkYXHs' },
        })
      expect(errors).toEqual(undefined)
      expect(data).toStrictEqual({
        login: { user: { id: 'ckn4oul7100004cv7y3t94n8j' } },
      })
      // TODO: Check that there is even a session cookie
      expect(response.get('set-cookie')).toBeDefined()
    })
  })
  describe('signup', () => {
    const email = getTemporaryEmail()
    test.runIf(process.env.EMAIL_CLIENT)(
      `sends an email to the address ${email}`,
      async () => {
        console.log('Creating account with email', email)
        const { data, errors } = await api()
          .mutate(gql`
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
          `)
          .variables({
            input: {
              email,
              password: 'EBNPXY35TYkYXHs',
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

describe('query', () => {
  describe('me', () => {
    it('returns the user when logged in', async () => {
      const request = api()
      await login(request)
      const { data, errors } = await request.query(gql`
        query MeE2E {
          me {
            id
          }
        }
      `)
      expect(errors).toEqual(undefined)
      expect(data).toStrictEqual({
        me: { id: 'ckn4oul7100004cv7y3t94n8j' },
      })
    })
    it('returns nothing when not logged in', async () => {
      const { data, errors } = await api().query(gql`
        query MeE2ENotLoggedIn {
          me {
            id
          }
        }
      `)
      expect(errors).toEqual(undefined)
      expect(data).toStrictEqual({
        me: null,
      })
    })
  })
})
