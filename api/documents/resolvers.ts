import { Prisma, User } from '@prisma/client'
import { injectable } from 'tsyringe'
import {
  FieldValueTuple,
  DocumentRawInput,
  DocumentRawUpdateInput,
  DocumentType,
  Resolvers as AllResolvers,
} from '../graphql'
import { UserDocumentService, UserDocument } from './user.document.service'

// Fields that are stored as separate columns in the database
const specialFields: string[] = [
  'author',
  'editor',
  'title',
  'journal',
  'journaltitle',
  'booktitle',
  'date',
  'year',
  'month',
  'number',
  'volume',
  'edition',
  'series',
  'pages',
  'pagetotal',
  'issue',
  'note',
  'url',
  'urldate',
  'publisher',
  'abstract',
  'keywords',
  'priority',
  'doi',
  'eprint',
  'eprintclass',
  'eprinttype',
  'issn',
  'isbn',
]

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

function toPair(field: string, value: string | null): FieldValueTuple | null {
  if (value) {
    return {
      field,
      value,
    }
  } else {
    return null
  }
}

function convertFromRaw(
  document: DocumentRawInput | DocumentRawUpdateInput
): Prisma.UserDocumentCreateInput {
  const special = document.fields
    ?.filter((item) => specialFields.includes(item.field))
    .map((item) => {
      return [item.field, item.value]
    })
  const other = document.fields
    ?.filter((item) => !specialFields.includes(item.field))
    .map((item) => {
      return {
        field: item.field,
        value: item.value,
      }
    })

  let convertedDocument: Prisma.UserDocumentCreateInput = {
    type: document.type ?? 'unknown',
    citationKey: document.citationKey ?? null,
    lastModified: document.lastModified ?? null,
    added: document.added ?? null,
    ...(other &&
      other.length > 0 && {
        other: {
          createMany: {
            data: other,
          },
        },
      }),
  }

  if (special) {
    convertedDocument = Object.assign(
      convertedDocument,
      Object.fromEntries(special)
    )
  }
  if ('id' in document) {
    convertedDocument = Object.assign(convertedDocument, { id: document.id })
  }

  return convertedDocument
}

export function parse(type: string): DocumentType | null {
  const found = Object.entries(DocumentType).find(
    ([key, _value]) =>
      key.localeCompare(type, undefined, { sensitivity: 'accent' }) === 0
  )
  if (found) {
    return found[1]
  } else {
    return null
  }
}

@injectable()
export class Resolvers {
  constructor(private userDocumentService: UserDocumentService) {}

  async getDocumentsOf(user: User): Promise<UserDocument[]> {
    return await this.userDocumentService.getDocumentsOf(user)
  }

  async getUserDocument(id: string): Promise<UserDocument | null> {
    return await this.userDocumentService.getDocumentById(id, true)
  }

  async addUserDocument(
    document: DocumentRawInput
  ): Promise<UserDocument | null> {
    return await this.userDocumentService.addDocument(convertFromRaw(document))
  }

  getAllFields(document: UserDocument): FieldValueTuple[] {
    const documentFields = Object.entries(document)
      .filter(([key, _]) => specialFields.includes(key))
      .map(([key, value]) => toPair(key, value as string))
      .filter(notEmpty)

    let otherFields: FieldValueTuple[] = []
    if (document.other) {
      // document.other is an array of objects of the form { field: value }
      otherFields = (document.other as Prisma.JsonArray)
        .map((item) => {
          if (item) {
            const [key, value] = Object.entries(item)[0]
            return toPair(key as string, value as string)
          }
          return null
        })
        .filter(notEmpty)
    }
    return [...documentFields, ...otherFields]
  }

  resolvers(): AllResolvers {
    return {
      Query: {
        getUserDocumentRaw: (_parent, { id }, _context) =>
          this.getUserDocument(id),
      },

      Mutation: {
        addUserDocumentRaw: (_parent, { document }, _context) =>
          this.addUserDocument(document),
      },

      Document: {
        __resolveType(document, _context) {
          switch (parse(document.type)) {
            case DocumentType.Article:
              return 'Article'
            default:
              return 'Unknown'
          }
        },
      },

      DocumentRaw: {
        fields: (document, _args, _context) => {
          return this.getAllFields(document)
        },
      },

      Article: {
        author: (document, _args, _context) => {
          if (document.author) {
            return {
              id: 'TODO',
              name: document.author,
              __typename: 'Person',
            }
          } else {
            return null
          }
        },

        journal: (document, _args, _context) => {
          const journalName = document.journal ?? document.journaltitle
          if (journalName) {
            return {
              id: 'TODO',
              name: journalName,
            }
          } else {
            return null
          }
        },
      },
    }
  }
}
