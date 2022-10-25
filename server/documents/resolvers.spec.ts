import { mock, mockReset } from 'vitest-mock-extended'
import { createUnauthenticatedContext } from '~/test/context.helper'
import { register, resolve } from '../tsyringe'
import { DocumentResolver } from './resolvers'
import { UserDocument, UserDocumentService } from './user.document.service'

const userDocumentService = mock<UserDocumentService>()
register('UserDocumentService', { useValue: userDocumentService })
const query = resolve('DocumentQuery')
const mutation = resolve('DocumentMutation')

const context = createUnauthenticatedContext()

beforeEach(() => {
  mockReset(userDocumentService)
})

describe('Query', () => {
  describe('userDocument', () => {
    it('gets the correct document', async () => {
      userDocumentService.getDocumentById
        .calledWith('uniqueId')
        .mockResolvedValueOnce({
          id: 'uniqueId',
          type: 'OTHER',
        } as UserDocument)
      const document = await query.userDocument({}, { id: 'uniqueId' }, context)
      expect(document).toEqual({
        id: 'uniqueId',
        type: 'OTHER',
      })
    })
  })
})

describe('Mutation', () => {
  describe('addUserDocument', () => {
    /* TODO: Handle other fields
    it('converts other unknown fields correctly', async () => {
      await mutation.addUserDocument(
        {},
        {
          input: {
            journalArticle: {
              other: [
                {
                  field: 'some',
                  value: 'random field',
                },
              ],
            }
          },
        },
        context
      )
      expect(userDocumentService.addDocument).toHaveBeenCalledWith({
        added: null,
        citationKey: null,
        lastModified: null,
        type: 'something',
        other: {
          createMany: {
            data: [
              {
                field: 'some',
                value: 'random field',
              },
            ],
          },
        },
      })
    })
    */

    it('converts single person author correctly', async () => {
      await mutation.addUserDocument(
        {},
        {
          input: {
            journalArticle: {
              authors: [
                {
                  person: {
                    family: 'Doe',
                    given: 'John',
                  },
                },
              ],
            },
          },
        },
        context
      )
      expect(userDocumentService.addDocument).toHaveBeenCalledWith({
        added: undefined,
        citationKeys: [],
        lastModified: undefined,
        type: 'JOURNAL_ARTICLE',
        authors: [
          {
            family: 'Doe',
            given: 'John',
          },
        ],
        abstract: undefined,
        doi: undefined,
        electronicId: null,
        keywords: [],
        languages: [],
        note: undefined,
        originalLanguages: [],
        pageEnd: null,
        pageStart: null,
        publicationState: undefined,
        publishedAt: null,
        revisionNumber: undefined,
        subtitle: undefined,
        title: undefined,
        titleAddon: undefined,
        translators: [],
      })
    })
  })
})

describe('DocumentResolver', () => {
  const documentResolver = new DocumentResolver()
  describe('resolveType', () => {
    it('returns JournalArticle for articles', () => {
      const article = {
        type: 'JOURNAL_ARTICLE',
      } as UserDocument
      expect(documentResolver.__resolveType(article)).toEqual('JournalArticle')
    })
  })
})
