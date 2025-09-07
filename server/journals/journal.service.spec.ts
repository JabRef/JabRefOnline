import { beforeEach, describe, expect, it } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'
import type { Journal, PrismaClient } from '../database'
import { register, resolve } from '../tsyringe'

const prisma = mockDeep<PrismaClient>()
register('PrismaClient', { useValue: prisma })
const journalService = resolve('JournalService')

const testJournal: Journal = {
  id: 'test',
  name: 'Test Journal',
  issn: ['12345678'],
  subtitle: null,
  titleAddon: null,
  isCustom: true,
  scimagoId: null,
  country: null,
  publisher: null,
  areas: [],
  categories: [],
  hIndex: null,
}

describe('userDocumentService', () => {
  beforeEach(() => {
    mockReset(prisma)
  })

  describe('getJournalById', () => {
    it('should return a journal with the given ISSN', async () => {
      prisma.journal.findFirst.mockResolvedValue(testJournal)
      const journal = await journalService.getJournalByIssn(testJournal.issn[0])
      expect(journal).toBeDefined()
      expect(journal).toEqual(testJournal)
      expect(prisma.journal.findFirst).toBeCalledWith({
        where: {
          issn: { has: testJournal.issn[0] },
          isCustom: false,
        },
      })
    })

    it('should return null if no journal with the given ISSN is found', async () => {
      prisma.journal.findFirst.mockResolvedValue(null)
      const issn = '00000000'
      const journal = await journalService.getJournalByIssn(issn)
      expect(journal).toBeNull()
      expect(prisma.journal.findFirst).toBeCalledWith({
        where: {
          issn: { has: issn },
          isCustom: false,
        },
      })
    })
  })
})
