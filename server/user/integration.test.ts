import { gql } from '~/apollo/apollo-server'
import * as prisma from '~/server/database/util'
import { createAuthenticatedClient } from '../../test/apollo.server'

describe('Query', () => {
  beforeEach(async () => {
    await prisma.resetToSeed()
  })

  afterAll(async () => {
    await prisma.disconnect()
  })

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
              "email": "alice@jabref.de",
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
})
