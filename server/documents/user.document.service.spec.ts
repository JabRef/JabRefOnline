import createPrismaMock from 'prisma-mock/client'
import { beforeEach, describe, expect, it } from 'vitest'
import { mockDeep } from 'vitest-mock-extended'
import { Prisma, type PrismaClient } from '../database'
import * as dmmf from '../database/generated/dmmf'
import { register, resolve } from '../tsyringe'
import type { UserDocument, UserDocumentService } from './user.document.service'

let prisma: PrismaClient
let userDocumentService: UserDocumentService

const testDocument: UserDocument = {
  id: 'test',
  type: 'JOURNAL_ARTICLE',
  citationKeys: ['testArticle'],
  lastModified: new Date(),
  added: new Date(),
  title: 'This is a test document',
  subtitle: null,
  titleAddon: null,
  abstract: null,
  contributors: [
    {
      entity: {
        id: 'random',
        family: 'Test',
        given: 'Test',
        type: 'PERSON',
        suffix: null,
        droppingParticle: null,
        nonDroppingParticle: null,
        name: null,
      },
      entityId: 'random',
      role: 'AUTHOR',
      documentId: 'test',
      position: 0,
    },
  ],
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
      issn: [],
      subtitle: null,
      titleAddon: null,
      isCustom: true,
      scimagoId: null,
      country: null,
      publisher: null,
      areas: [],
      categories: [],
      hIndex: null,
    },
  },
  pageStart: null,
  pageEnd: null,
  electronicId: null,
  originalLanguages: [],
  booktitle: null,
  publishedAt: '2021',
  edition: null,
  pagetotal: null,
  url: null,
  urldate: null,
  publisher: null,
  priority: null,
  revisionNumber: 1,
  revisionHash: 'test',
  doi: null,
  eprint: null,
  eprintclass: null,
  eprinttype: null,
  isbn: null,
}

beforeEach(() => {
  const mockClient = mockDeep<PrismaClient>()
  prisma = createPrismaMock(Prisma, { 
    mockClient,
    datamodel: { enums: dmmf.enums, models: dmmf.models }
  })
  register('PrismaClient', { useValue: prisma })
  userDocumentService = resolve('UserDocumentService')
})

describe('get document by id', () => {
  it('get the correct document', async () => {
    // Seed the mock database with test data
    await prisma.journal.create({ data: testDocument.journalIssue.journal })
    await prisma.journalIssue.create({ data: {
      id: testDocument.journalIssue.id,
      title: testDocument.journalIssue.title,
      subtitle: testDocument.journalIssue.subtitle,
      titleAddon: testDocument.journalIssue.titleAddon,
      number: testDocument.journalIssue.number,
      name: testDocument.journalIssue.name,
      series: testDocument.journalIssue.series,
      volume: testDocument.journalIssue.volume,
      journalId: testDocument.journalIssue.journalId,
    }})
    await prisma.entity.create({ data: testDocument.contributors[0]!.entity })
    await prisma.userDocument.create({ data: {
      id: testDocument.id,
      type: testDocument.type,
      citationKeys: testDocument.citationKeys,
      lastModified: testDocument.lastModified,
      added: testDocument.added,
      title: testDocument.title,
      subtitle: testDocument.subtitle,
      titleAddon: testDocument.titleAddon,
      abstract: testDocument.abstract,
      note: testDocument.note,
      languages: testDocument.languages,
      publicationState: testDocument.publicationState,
      keywords: testDocument.keywords,
      journalIssueId: testDocument.journalIssueId,
      pageStart: testDocument.pageStart,
      pageEnd: testDocument.pageEnd,
      electronicId: testDocument.electronicId,
      originalLanguages: testDocument.originalLanguages,
      booktitle: testDocument.booktitle,
      publishedAt: testDocument.publishedAt,
      edition: testDocument.edition,
      pagetotal: testDocument.pagetotal,
      url: testDocument.url,
      urldate: testDocument.urldate,
      publisher: testDocument.publisher,
      priority: testDocument.priority,
      revisionNumber: testDocument.revisionNumber,
      revisionHash: testDocument.revisionHash,
      doi: testDocument.doi,
      eprint: testDocument.eprint,
      eprintclass: testDocument.eprintclass,
      eprinttype: testDocument.eprinttype,
      isbn: testDocument.isbn,
    }})
    await prisma.documentContributor.create({ data: {
      entityId: testDocument.contributors[0]!.entityId,
      role: testDocument.contributors[0]!.role,
      documentId: testDocument.contributors[0]!.documentId,
      position: testDocument.contributors[0]!.position,
    }})

    const actualDocument = await userDocumentService.getDocumentById(
      testDocument.id,
    )
    expect(actualDocument).toEqual(testDocument)
  })
})
