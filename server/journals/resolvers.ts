import { Journal, QueryJournalArgs, Resolvers } from '#graphql/resolver'
import { Context } from '../context'
import { inject, injectable, resolve } from './../tsyringe'
import { JournalService } from './journal.service'

@injectable()
export class JournalResolver {
  constructor(
    @inject('JournalService')
    private journalService: JournalService
  ) {}

  async citationInfo(journal: Journal) {
    return await this.journalService.getCitationInfoYearly(journal.id)
  }
}

@injectable()
export class Query {
  constructor(
    @inject('JournalService')
    private journalService: JournalService
  ) {}

  async journal(
    _root: Record<string, never>,
    { id, issn, name }: QueryJournalArgs,
    _context: Context
  ): Promise<Journal | null> {
    if (id) {
      return await this.journalService.getJournalById(id)
    } else if (issn) {
      return await this.journalService.getJournalByIssn(issn)
    } else if (name) {
      return await this.journalService.getJournalByName(name)
    }
    throw new Error('No id, issn or name given')
  }
}

export function resolvers(): Resolvers {
  return {
    Query: resolve('JournalQuery'),
    Journal: resolve('JournalResolver'),
  }
}
