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
    for (const user of await userService.getUsers()) {
      for (const doc of await userDocumentService
        .getDocumentsOf(user)
        .then((ret) => ret.documents)) {
        actual.push(doc.revisionHash)
        expected.push(userDocumentService.getRevisionHash(doc))
      }
    }
    expect(actual).toEqual(expected)
  })
})
