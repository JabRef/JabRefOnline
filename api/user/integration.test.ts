import { gql } from 'apollo-server-express'
import { createAuthenticatedClient } from '../../test/apollo.server'
import * as prisma from '~/prisma/util'

const authenticatedClient = createAuthenticatedClient()

describe('User', () => {
  beforeEach(async () => {
    await prisma.resetToSeed()
  })

  afterAll(async () => {
    await prisma.disconnect()
  })

  describe('getCurrentUser', () => {
    const query = gql`
      query getCurrentUser {
        me {
          id
          email
        }
      }
    `

    it('retrieves the currently authenticated user', async () => {
      const result = await authenticatedClient.query({ query })
      expect(result).toMatchInlineSnapshot(`
        Object {
          "data": Object {
            "me": Object {
              "email": "test@testum.de2",
              "id": "ckn4oul7100004cv7y3t94n8j",
            },
          },
        }
      `)
    })
  })

  describe('getUserById', () => {
    const query = gql`
      query getUserById($id: ID!) {
        user(id: $id) {
          id
          email
          documentsRaw {
            id
          }
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
      const result = await authenticatedClient.query({
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
                  "id": "ckondtpcn000301mhg9lvaqlu",
                },
                Object {
                  "id": "ckondu6bh000501mh2o2tf00u",
                },
                Object {
                  "id": "ckonduhjk000701mh12wia4nf",
                },
              ],
              "documentsRaw": Array [
                Object {
                  "id": "ckondtcaf000101mh7x9g4gia",
                },
                Object {
                  "id": "ckondtpcn000301mhg9lvaqlu",
                },
                Object {
                  "id": "ckondu6bh000501mh2o2tf00u",
                },
                Object {
                  "id": "ckonduhjk000701mh12wia4nf",
                },
              ],
              "email": "test@testum.de2",
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
