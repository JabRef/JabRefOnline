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
})
