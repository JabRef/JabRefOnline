import createPrismaMock from 'prisma-mock/client'
import { beforeEach, describe, expect, it } from 'vitest'
import { mockDeep } from 'vitest-mock-extended'
import { Prisma, type Journal, type PrismaClient } from '../database'
import * as dmmf from '../database/generated/dmmf'
import { register, resolve } from '../tsyringe'
import type { JournalService } from './journal.service'

let prisma: PrismaClient
let journalService: JournalService

const testJournal: Journal = {
  id: 'test',
  name: 'Test Journal',
  issn: ['12345678'],
  subtitle: null,
  titleAddon: null,
  isCustom: false,
  scimagoId: null,
  country: null,
  publisher: null,
  areas: [],
  categories: [],
  hIndex: null,
}

describe('userDocumentService', () => {
  beforeEach(() => {
    const mockClient = mockDeep<PrismaClient>()
    prisma = createPrismaMock(Prisma, {
      mockClient,
      datamodel: { enums: dmmf.enums, models: dmmf.models },
    })
    register('PrismaClient', { useValue: prisma })
    journalService = resolve('JournalService')
  })

  describe('getJournalById', () => {
    it('should return a journal with the given ISSN', async () => {
      // Seed the mock database with test data
      await prisma.journal.create({ data: testJournal })

      const journal = await journalService.getJournalByIssn(
        testJournal.issn[0]!,
      )
      expect(journal).toBeDefined()
      expect(journal).toEqual(testJournal)
    })

    it('should return null if no journal with the given ISSN is found', async () => {
      const issn = '00000000'
      const journal = await journalService.getJournalByIssn(issn)
      expect(journal).toBeNull()
    })
  })
})
