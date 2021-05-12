import { container } from 'tsyringe'
import { mockDeep, mockReset } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'
import { UserDocument, UserDocumentService } from './user.document.service'

const prisma = mockDeep<PrismaClient>()
container.registerInstance(PrismaClient, prisma)
const userDocumentService = container.resolve(UserDocumentService)

const testDocument: UserDocument = {
  id: 'test',
  type: 'article',
  citationKey: 'testArticle',
  lastModified: null,
  added: null,
  author: 'JabRef team',
  editor: null,
  title: 'This is a test document',
  journal: null,
  journaltitle: 'Journal of JabRef',
  booktitle: null,
  date: '2021',
  year: null,
  month: null,
  number: null,
  volume: null,
  edition: null,
  series: null,
  pages: null,
  pagetotal: null,
  issue: null,
  note: null,
  url: null,
  urldate: null,
  publisher: null,
  abstract: null,
  keywords: null,
  priority: null,
  doi: null,
  eprint: null,
  eprintclass: null,
  eprinttype: null,
  issn: null,
  isbn: null,
}

beforeEach(() => {
  mockReset(prisma)
})

describe('getDocumentById', () => {
  it('get the correct document', async () => {
    prisma.userDocument.findUnique.mockResolvedValue(testDocument)

    const actualDocument = await userDocumentService.getDocumentById(
      testDocument.id
    )
    expect(actualDocument).toEqual(testDocument)
    expect(prisma.userDocument.findUnique).toBeCalledWith({
      where: {
        id: testDocument.id,
      },
      include: {
        other: false,
      },
    })
  })
})
