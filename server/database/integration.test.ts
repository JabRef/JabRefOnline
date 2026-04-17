import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import * as prisma from '~/server/database/util'
import { resolve } from '../tsyringe'

beforeEach(async () => {
  await prisma.resetToSeed()
})

afterAll(async () => {
  await prisma.disconnect()
})

describe('seed', () => {
  it('produces correct revision hashes', async () => {
    const userService = resolve('AuthService')
    const userDocumentService = resolve('UserDocumentService')
    const actual = []
    const expected = []
    const users = await userService.getUsers()
    const userDocuments = await Promise.all(
      users.map(async (user) => {
        return userDocumentService
          .getDocumentsOf(user)
          .then((ret) => ret.documents)
      }),
    )
    for (const documents of userDocuments) {
      for (const doc of documents) {
        actual.push(doc.revisionHash)
        expected.push(userDocumentService.getRevisionHash(doc))
      }
    }
    expect(actual).toEqual(expected)
  })
})
