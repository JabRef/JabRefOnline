import { gql } from '~/apollo/apollo-server'
import * as prisma from '~/server/database/util'
import { createAuthenticatedClient } from '../../test/apollo.server'

beforeEach(async () => {
  await prisma.resetToSeed()
})

afterAll(async () => {
  await prisma.disconnect()
})

describe('Query', () => {
  describe('me', () => {
    const query = gql`
      query MeTest {
        me {
          id
          email
        }
      }
    `

    it('retrieves the currently authenticated user', async () => {
      const authenticatedClient = await createAuthenticatedClient()
      const result = await authenticatedClient.executeOperation({ query })
      expect(result).toMatchInlineSnapshot(`
        {
          "data": {
            "me": {
              "email": "alice@jabref.org",
              "id": "ckn4oul7100004cv7y3t94n8j",
            },
          },
        }
      `)
    })
  })

  describe('user', () => {
    const query = gql`
      query UserById($id: ID!) {
        user(id: $id) {
          id
          email
          documents {
            edges {
              node {
                id
                title
              }
            }
          }
          groups {
            id
          }
        }
      }
    `

    it('resolves all fields of user', async () => {
      const authenticatedClient = await createAuthenticatedClient()
      const result = await authenticatedClient.executeOperation({
        query,
        variables: { id: 'ckn4oul7100004cv7y3t94n8j' },
      })
      expect(result).toMatchInlineSnapshot(`
        {
          "data": {
            "user": {
              "documents": {
                "edges": [
                  {
                    "node": {
                      "id": "ckondtcaf000101mh7x9g4gia",
                      "title": "Cocoa and Cardiovascular Health",
                    },
                  },
                  {
                    "node": {
                      "id": "ckr9eq4oc000101mk1ga9bxnt",
                      "title": "Cocoa and health: a decade of research",
                    },
                  },
                  {
                    "node": {
                      "id": "ckr9eqap6000301mk20hycjqb",
                      "title": "Chocolate and prevention of cardiovascular disease: A systematic review",
                    },
                  },
                  {
                    "node": {
                      "id": "ckonduhjk000701mh12wia4nf",
                      "title": "Cocoa and Chocolate in Human Health and Disease",
                    },
                  },
                  {
                    "node": {
                      "id": "ckondu6bh000501mh2o2tf00u",
                      "title": "Chocolate: food as medicine/medicine as food",
                    },
                  },
                  {
                    "node": {
                      "id": "ckondtpcn000301mhg9lvaqlu",
                      "title": "Functionality of inulin and polydextrose in stevia or thaumatin sweetened dark chocolate",
                    },
                  },
                ],
              },
              "email": "alice@jabref.org",
              "groups": [
                {
                  "id": "ckn4h9pl5000101le5bco3b8r",
                },
                {
                  "id": "ckn4i99oe000101mc4igzgvix",
                },
                {
                  "id": "ckn4i9u9m000901mcc4mjgdkq",
                },
                {
                  "id": "ckn4iaf1t000h01mcaob9ewey",
                },
                {
                  "id": "ckn4iar8j000n01mc7feq709f",
                },
              ],
              "id": "ckn4oul7100004cv7y3t94n8j",
            },
          },
        }
      `)
    })
  })

  describe('user.changes', () => {
    it('without cursor returns all documents', async () => {
      const authenticatedClient = await createAuthenticatedClient()
      const result = await authenticatedClient.executeOperation({
        query: gql`
          query UserChanges($id: ID!) {
            user(id: $id) {
              id
              changes {
                edges {
                  node {
                    id
                    lastModified
                  }
                }
              }
            }
          }
        `,
        variables: { id: 'ckn4oul7100004cv7y3t94n8j' },
      })
      expect(result).toMatchInlineSnapshot(`
        {
          "data": {
            "user": {
              "changes": {
                "edges": [
                  {
                    "node": {
                      "id": "ckondtcaf000101mh7x9g4gia",
                      "lastModified": 2021-01-01T00:00:00.000Z,
                    },
                  },
                  {
                    "node": {
                      "id": "ckr9eq4oc000101mk1ga9bxnt",
                      "lastModified": 2021-05-28T12:00:00.000Z,
                    },
                  },
                  {
                    "node": {
                      "id": "ckr9eqap6000301mk20hycjqb",
                      "lastModified": 2022-01-01T00:00:00.000Z,
                    },
                  },
                  {
                    "node": {
                      "id": "ckondu6bh000501mh2o2tf00u",
                      "lastModified": 2022-10-11T17:31:24.033Z,
                    },
                  },
                  {
                    "node": {
                      "id": "ckondtpcn000301mhg9lvaqlu",
                      "lastModified": 2022-10-11T17:31:24.083Z,
                    },
                  },
                ],
              },
              "id": "ckn4oul7100004cv7y3t94n8j",
            },
          },
        }
      `)
    })
  })
})

describe('Mutation', () => {
  describe('signup', () => {
    const mutation = gql`
      mutation SignupTest($input: SignupInput!) {
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
    `

    it('fails if password is too short', async () => {
      const authenticatedClient = await createAuthenticatedClient()
      const result = await authenticatedClient.executeOperation({
        query: mutation,
        variables: {
          input: {
            email: 'test@test.de',
            password: '123',
          },
        },
      })
      expect(result).toMatchInlineSnapshot(`
        {
          "data": {
            "signup": {
              "problems": [
                {
                  "message": "The password must be at least 8 characters long",
                  "path": [
                    "password",
                  ],
                },
              ],
            },
          },
        }
      `)
    })
  })
})
