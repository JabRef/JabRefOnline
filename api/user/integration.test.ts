import { gql } from 'apollo-server-express'
import { createAuthenticatedClient } from '../../test/apollo.server'
import * as prisma from '~/api/database/util'

const authenticatedClient = createAuthenticatedClient()

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
            id
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
              "documents": Array [
                Object {
                  "id": "ckondtcaf000101mh7x9g4gia",
                },
                Object {
                  "id": "ckr9eq4oc000101mk1ga9bxnt",
                },
                Object {
                  "id": "ckr9eqap6000301mk20hycjqb",
                },
                Object {
                  "id": "ckonduhjk000701mh12wia4nf",
                },
                Object {
                  "id": "ckondu6bh000501mh2o2tf00u",
                },
                Object {
                  "id": "ckondtpcn000301mhg9lvaqlu",
                },
              ],
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
