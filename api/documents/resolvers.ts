import { Prisma, User, UserDocument } from '@prisma/client'
import { injectable } from 'tsyringe'
import {
  FieldValueTuple,
  QueryResolvers,
  MutationResolvers,
  DocumentRaw,
  DocumentRawInput,
  DocumentRawUpdateInput,
  DocumentResolvers,
  Document,
  DocumentType,
} from '../graphql'
import { UserDocumentService } from './user.document.service'

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

function convertToRaw(document: UserDocument): DocumentRaw {
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

  return {
    id: document.id,
    type: document.type,
    citationKey: document.citationKey,
    lastModified: document.lastModified,
    added: document.added,
    fields: [...documentFields, ...otherFields],
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
      return { [item.field]: item.value }
    })

  let convertedDocument = {
    type: document.type ?? 'unknown',
    citationKey: document.citationKey ?? null,
    lastModified: document.lastModified ?? null,
    added: document.added ?? null,
    other,
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
  const found = Object.entries(DocumentType).find(([key, _value]) =>
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

  async getDocumentsOf(user: User): Promise<Document[]> {
    const documents = await this.userDocumentService.getDocumentsOf(user)
    return documents.map((document) => {
      let author
      if (document.author) {
        author = {
          name: document.author,
          __typename: 'Person',
        }
      }
      const journalName = document.journal ?? document.journaltitle
      let journal
      if (journalName) {
        journal = {
          name: journalName,
        }
      }

      return {
        id: document.id,
        title: document.title,
        type: parse(document.type),
        abstract: document.abstract,
        author,
        journal,
      }
    })
  }

  async getUserDocumentRaw(id: string): Promise<DocumentRaw | null> {
    const document = await this.userDocumentService.getDocumentById(id)
    if (document) {
      return convertToRaw(document)
    } else {
      return null
    }
  }

  async addUserDocumentRaw(
    document: DocumentRawInput
  ): Promise<DocumentRaw | null> {
    const addedDocument = await this.userDocumentService.addDocument(
      convertFromRaw(document)
    )
    if (addedDocument) {
      return convertToRaw(addedDocument)
    } else {
      return null
    }
  }

  queryResolvers(): QueryResolvers {
    return {
      getUserDocumentRaw: (_parent, { id }, _context) =>
        this.getUserDocumentRaw(id),
    }
  }

  mutationResolvers(): MutationResolvers {
    return {
      addUserDocumentRaw: (_parent, { document }, _context) =>
        this.addUserDocumentRaw(document),
    }
  }

  documentResolver(): DocumentResolvers {
    return {
      __resolveType(document, _context) {
        switch (document.type) {
          case DocumentType.Article:
            return 'Article'
          default:
            return 'Unknown'
        }
      },
    }
  }
}
