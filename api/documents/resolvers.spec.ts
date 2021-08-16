import { container } from 'tsyringe'
import { mock, mockReset } from 'jest-mock-extended'
import { UserDocument } from '@prisma/client'
import { DocumentType } from '../graphql'
import { UserDocumentService } from './user.document.service'
import { parse, Query, Mutation, DocumentResolver } from './resolvers'
import { createUnauthenticatedContext } from '~/test/context.helper'

const userDocumentService = mock<UserDocumentService>()
container.registerInstance(UserDocumentService, userDocumentService)
const query = container.resolve(Query)
const mutation = container.resolve(Mutation)

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
          type: 'something',
        } as UserDocument)
      const document = await query.userDocument({}, { id: 'uniqueId' }, context)
      expect(document).toEqual({
        id: 'uniqueId',
        type: 'something',
      })
    })
  })
})

describe('Mutation', () => {
  describe('addUserDocument', () => {
    it('converts other fields correctly', async () => {
      await mutation.addUserDocument(
        {},
        {
          document: {
            type: 'something',
            fields: [
              {
                field: 'some',
                value: 'random field',
              },
            ],
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

    it('converts special fields correctly', async () => {
      await mutation.addUserDocument(
        {},
        {
          document: {
            type: 'something',
            fields: [
              {
                field: 'author',
                value: 'JabRef devs',
              },
            ],
          },
        },
        context
      )
      expect(userDocumentService.addDocument).toHaveBeenCalledWith({
        added: null,
        citationKey: null,
        lastModified: null,
        type: 'something',
        author: 'JabRef devs',
      })
    })
  })
})

describe('DocumentResolver', () => {
  const documentResolver = new DocumentResolver()
  describe('resolveType', () => {
    it('returns Article for articles', () => {
      const article = {
        type: DocumentType.Article,
      } as UserDocument
      expect(documentResolver.__resolveType(article)).toEqual('Article')
    })
  })
})

describe('parse', () => {
  it('converts lowercase type correctly', () => {
    expect(parse('article')).toEqual(DocumentType.Article)
  })

  it('converts uppercase type correctly', () => {
    expect(parse('Article')).toEqual(DocumentType.Article)
  })
})
