import { container } from 'tsyringe'
import { mock, mockReset } from 'jest-mock-extended'
import { UserDocument } from '@prisma/client'
import { DocumentType } from '../graphql'
import { UserDocumentService } from './user.document.service'
import { parse, Resolvers } from './resolvers'

const userDocumentService = mock<UserDocumentService>()
container.registerInstance(UserDocumentService, userDocumentService)
const resolvers = container.resolve(Resolvers)

beforeEach(() => {
  mockReset(userDocumentService)
})

describe('getUserDocumentRaw', () => {
  it('gets the correct document', async () => {
    userDocumentService.getDocumentById
      .calledWith('uniqueId')
      .mockResolvedValueOnce({
        id: 'uniqueId',
        type: 'something',
      } as UserDocument)
    const document = await resolvers.getUserDocumentRaw('uniqueId')
    expect(document).toEqual({
      id: 'uniqueId',
      type: 'something',
      fields: [],
    })
  })

  it('puts special field in fields', async () => {
    userDocumentService.getDocumentById
      .calledWith('uniqueId')
      .mockResolvedValueOnce({
        id: 'uniqueId',
        type: 'something',
        author: 'JabRef devs',
      } as UserDocument)
    const document = await resolvers.getUserDocumentRaw('uniqueId')
    expect(document).toEqual({
      id: 'uniqueId',
      type: 'something',
      fields: [
        {
          field: 'author',
          value: 'JabRef devs',
        },
      ],
    })
  })

  it('puts other field in fields', async () => {
    userDocumentService.getDocumentById
      .calledWith('uniqueId')
      .mockResolvedValueOnce(({
        id: 'uniqueId',
        type: 'something',
        other: [
          {
            some: 'random field',
          },
        ],
      } as unknown) as UserDocument)
    const document = await resolvers.getUserDocumentRaw('uniqueId')
    expect(document).toEqual({
      id: 'uniqueId',
      type: 'something',
      fields: [
        {
          field: 'some',
          value: 'random field',
        },
      ],
    })
  })
})

describe('addUserDocumentRaw', () => {
  it('converts other fields correctly', async () => {
    await resolvers.addUserDocumentRaw({
      type: 'something',
      fields: [
        {
          field: 'some',
          value: 'random field',
        },
      ],
    })
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
    await resolvers.addUserDocumentRaw({
      type: 'something',
      fields: [
        {
          field: 'author',
          value: 'JabRef devs',
        },
      ],
    })
    expect(userDocumentService.addDocument).toHaveBeenCalledWith({
      added: null,
      citationKey: null,
      lastModified: null,
      type: 'something',
      author: 'JabRef devs',
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
