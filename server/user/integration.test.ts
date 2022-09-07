import { gql } from '~/apollo/apollo-server'
import * as prisma from '~/server/database/util'
import { createAuthenticatedClient } from '../../test/apollo.server'

const authenticatedClient = await createAuthenticatedClient()

describe('Query', () => {
  beforeEach(async () => {
    await prisma.resetToSeed()
  })

  afterAll(async () => {
    await prisma.disconnect()
  })

  describe('me', () => {
    const query = gql`
      query me {
        me {
          id
          email
        }
      }
    `

    it('retrieves the currently authenticated user', async () => {
      const result = await authenticatedClient.executeOperation({ query })
      expect(result).toMatchInlineSnapshot(`
        Object {
          "data": Object {
            "me": Object {
              "email": "alice@jabref.de",
              "id": "ckn4oul7100004cv7y3t94n8j",
            },
          },
        }
      `)
    })
  })

  describe('user', () => {
    const query = gql`
      query getUserById($id: ID!) {
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
      const result = await authenticatedClient.executeOperation({
        query,
        variables: { id: 'ckn4oul7100004cv7y3t94n8j' },
      })
      expect(result).toMatchInlineSnapshot(`
        Object {
          "data": Object {
            "user": Object {
              "documents": Object {
                "edges": Array [
                  Object {
                    "node": Object {
                      "id": "ckondtcaf000101mh7x9g4gia",
                      "title": "Cocoa and Cardiovascular Health",
                    },
                  },
                  Object {
                    "node": Object {
                      "id": "ckr9eq4oc000101mk1ga9bxnt",
                      "title": "Cocoa and health: a decade of research",
                    },
                  },
                  Object {
                    "node": Object {
                      "id": "ckr9eqap6000301mk20hycjqb",
                      "title": "Chocolate and prevention of cardiovascular disease: A systematic review",
                    },
                  },
                  Object {
                    "node": Object {
                      "id": "ckonduhjk000701mh12wia4nf",
                      "title": "Cocoa and Chocolate in Human Health and Disease",
                    },
                  },
                  Object {
                    "node": Object {
                      "id": "ckondu6bh000501mh2o2tf00u",
                      "title": "Chocolate: food as medicine/medicine as food",
                    },
                  },
                  Object {
                    "node": Object {
                      "id": "ckondtpcn000301mhg9lvaqlu",
                      "title": "Functionality of inulin and polydextrose in stevia or thaumatin sweetened dark chocolate",
                    },
                  },
                ],
              },
              "email": "alice@jabref.de",
              "groups": Array [
                Object {
                  "id": "ckn4h9pl5000101le5bco3b8r",
                },
                Object {
                  "id": "ckn4i99oe000101mc4igzgvix",
                },
                Object {
                  "id": "ckn4i9u9m000901mcc4mjgdkq",
                },
                Object {
                  "id": "ckn4iaf1t000h01mcaob9ewey",
                },
                Object {
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
})
