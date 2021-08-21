import { container } from 'tsyringe'
import { mockDeep, mockReset } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'
import { UserDocument, UserDocumentService } from './user.document.service'

const prisma = mockDeep<PrismaClient>()
container.registerInstance(PrismaClient, prisma)
const userDocumentService = container.resolve(UserDocumentService)

const testDocument: UserDocument = {
  id: 'test',
  type: 'JOURNAL_ARTICLE',
  citationKeys: ['testArticle'],
  lastModified: null,
  added: null,
  author: 'JabRef team',
  editor: null,
  title: 'This is a test document',
  journalIssueId: 'testIssue',
  journalIssue: {
    id: 'testIssue',
    title: null,
    subtitle: null,
    titleAddon: null,
    number: null,
    name: null,
    series: null,
    volume: null,
    journalId: 'test_journal',
    journal: {
      id: 'test_journal',
      name: 'Test Journal',
      issn: null,
      subtitle: null,
      titleAddon: null,
    },
  },
  booktitle: null,
  publishedAt: '2021',
  edition: null,
  pages: null,
  pagetotal: null,
  note: null,
  url: null,
  urldate: null,
  publisher: null,
  abstract: null,
  keywords: [],
  priority: null,
  doi: null,
  eprint: null,
  eprintclass: null,
  eprinttype: null,
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
        journalIssue: {
          include: {
            journal: true,
          },
        },
      },
    })
  })
})
