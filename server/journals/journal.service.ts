import { PrismaClient } from '@prisma/client'
import { inject, injectable } from './../tsyringe'

@injectable()
export class JournalService {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async getJournalById(id: string) {
    return (
      (await this.prisma.journal.findUnique({
        where: {
          id,
        },
      })) ?? null
    )
  }

  async getJournalByIssn(issn: number) {
    return (
      (await this.prisma.journal.findFirst({
        where: {
          issn: {
            has: issn,
          },
          isCustom: false,
        },
      })) ?? null
    )
  }

  async getJournalByName(name: string) {
    return (
      (await this.prisma.journal.findFirst({
        where: {
          name: {
            equals: name,
            mode: 'insensitive',
          },
          isCustom: false,
        },
      })) ?? null
    )
  }

  async getCitationInfoYearly(id: string) {
    return await this.prisma.journalCitationInfoYearly.findMany({
      where: {
        journalId: id,
      },
    })
  }
}
