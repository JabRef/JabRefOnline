import type { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset } from 'vitest-mock-extended'
import { register, resolve } from '../tsyringe'
import { UserDocument } from './user.document.service'

const prisma = mockDeep<PrismaClient>()
register('PrismaClient', { useValue: prisma })
const userDocumentService = resolve('UserDocumentService')

const testDocument: UserDocument = {
  id: 'test',
  type: 'JOURNAL_ARTICLE',
  citationKeys: ['testArticle'],
  lastModified: new Date(),
  added: new Date(),
  editor: null,
  title: 'This is a test document',
  subtitle: null,
  titleAddon: null,
  abstract: null,
  author: 'JabRef team',
  note: null,
  languages: [],
  publicationState: 'published',
  keywords: [],
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
  pageStart: null,
  pageEnd: null,
  electronicId: null,
  originalLanguages: [],
  translators: [],
  booktitle: null,
  publishedAt: '2021',
  edition: null,
  pagetotal: null,
  url: null,
  urldate: null,
  publisher: null,
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
