import { container } from 'tsyringe'
import mocking from 'jest-mock-extended'
import { UserDocument } from '@prisma/client'
import { UserDocumentService } from './user.document.service'
import { Query, Mutation, DocumentResolver } from './resolvers'
import { createUnauthenticatedContext } from '~/test/context.helper'

const userDocumentService = mocking.mock<UserDocumentService>()
container.registerInstance(UserDocumentService, userDocumentService)
const query = container.resolve(Query)
const mutation = container.resolve(Mutation)

const context = createUnauthenticatedContext()

beforeEach(() => {
  mocking.mockReset(userDocumentService)
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
                    name: 'JabRef devs',
                  },
                },
              ],
            },
          },
        },
        context
      )
      expect(userDocumentService.addDocument).toHaveBeenCalledWith({
        added: null,
        citationKeys: [],
        lastModified: null,
        type: 'JOURNAL_ARTICLE',
        author: 'JabRef devs',
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
