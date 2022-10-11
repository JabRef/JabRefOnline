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
    for (const user of await userService.getUsers()) {
      for (const doc of await userDocumentService
        .getDocumentsOf(user)
        .then((ret) => ret.documents)) {
        expect(doc.revisionHash, `wrong hash for document '${doc.id}'`).toEqual(
          userDocumentService.getRevisionHash(doc)
        )
      }
    }
  })
})
