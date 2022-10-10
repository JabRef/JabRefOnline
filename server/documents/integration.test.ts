import { gql } from '~/apollo/apollo-server'
import * as prisma from '~/server/database/util'
import { createAuthenticatedClient } from '../../test/apollo.server'

beforeEach(async () => {
  await prisma.resetToSeed()
})

afterAll(async () => {
  await prisma.disconnect()
})

const userDocumentById = gql`
  fragment Entity on Entity {
    ... on Person {
      id
      name
    }
    ... on Organization {
      id
      name
    }
  }
  query UserDocumentById($id: ID!) {
    userDocument(id: $id) {
      id
      __typename
      citationKeys
      lastModified
      added
      title
      subtitle
      titleAddon
      abstract
      authors {
        ...Entity
      }
      note
      languages
      publicationState
      doi
      keywords
      ... on JournalArticle {
        in {
          id
          journal {
            id
            name
            subtitle
            titleAddon
            issn
          }
          title
          subtitle
          titleAddon
          number
          name
          series
          volume
        }
        pageStart
        pageEnd
        electronicId
        translated {
          translators {
            ...Entity
          }
        }
        published
        annotators {
          ...Entity
        }
        commentators {
          ...Entity
        }
      }
    }
  }
`

describe('Query', () => {
  describe('userDocument', () => {
    it('retrieves fields for articles in journals', async () => {
      const authenticatedClient = await createAuthenticatedClient()
      const result = await authenticatedClient.executeOperation({
        query: userDocumentById,
        variables: { id: 'ckondtcaf000101mh7x9g4gia' },
      })
      expect(result).toMatchInlineSnapshot(`
        {
          "data": {
            "userDocument": {
              "__typename": "JournalArticle",
              "abstract": "Epidemiological data demonstrate that regular dietary intake of plant-derived foods and beverages reduces the risk of coronary heart disease and stroke. Among many ingredients, cocoa might be an important mediator. Indeed, recent research demonstrates a beneficial effect of cocoa on blood pressure, insulin resistance, and vascular and platelet function. Although still debated, a range of potential mechanisms through which cocoa might exert its benefits on cardiovascular health have been proposed, including activation of nitric oxide and antioxidant and antiinflammatory effects. This review summarizes the available data on the cardiovascular effects of cocoa, outlines potential mechanisms involved in the response to cocoa, and highlights the potential clinical implications associated with its consumption. ( Circulation. 2009; 119: 1433-1441.)",
              "added": null,
              "annotators": [],
              "authors": [
                {
                  "id": "TODOCorti, Roberto",
                  "name": "Corti, Roberto",
                },
                {
                  "id": "TODOFlammer, Andreas J.",
                  "name": "Flammer, Andreas J.",
                },
                {
                  "id": "TODOHollenberg, Norman K.",
                  "name": "Hollenberg, Norman K.",
                },
                {
                  "id": "TODOLuscher, Thomas F.",
                  "name": "Luscher, Thomas F.",
                },
              ],
              "citationKeys": [],
              "commentators": [],
              "doi": "10.1161/CIRCULATIONAHA.108.827022",
              "electronicId": null,
              "id": "ckondtcaf000101mh7x9g4gia",
              "in": {
                "id": "ckslizms5000109jv3yx80ujf",
                "journal": {
                  "id": "ckslj094u000309jvdpng93mk",
                  "issn": null,
                  "name": "Circulation",
                  "subtitle": null,
                  "titleAddon": null,
                },
                "name": null,
                "number": "10",
                "series": null,
                "subtitle": null,
                "title": null,
                "titleAddon": null,
                "volume": "119",
              },
              "keywords": [
                "cocoa",
                "endothelium",
                "hypertension",
                "platelets",
              ],
              "languages": [],
              "lastModified": null,
              "note": null,
              "pageEnd": "1441",
              "pageStart": "1433",
              "publicationState": null,
              "published": "2009",
              "subtitle": null,
              "title": "Cocoa and Cardiovascular Health",
              "titleAddon": null,
              "translated": null,
            },
          },
        }
      `)
    })
  })
})

describe('Resolver', () => {
  describe('User.documents', () => {
    it('returns all documents after checkpoint') {
      const authenticatedClient = await createAuthenticatedClient()
      const result = await authenticatedClient.executeOperation({
        query: gql``,
        variables: { id: 'ckondtcaf000101mh7x9g4gia', lastModified: '2020-01-01:00:00:00' },
      })
    }
  })
})

describe('Roundtrip', () => {
  describe('journal articles', () => {
    const testArticle = {
      title: 'Test Title',
      authors: [
        { person: { name: 'Test Author' } },
        { person: { name: 'Second Test Author' } },
      ],
      abstract: 'Some abstract',
      keywords: ['keyword1', 'keyword2'],
      doi: 'doi which does not exist',
      in: {
        journal: {
          name: 'Journal of great things',
        },
        volume: '15',
        number: '10',
      },
      pageStart: '2779',
      pageEnd: '2811',
      published: '2011',
    }
    it('addUserDocument + query', async () => {
      const addUserDocument = gql`
        mutation AddUserDocument($input: AddUserDocumentInput!) {
          addUserDocument(input: $input) {
            id
          }
        }
      `
      const authenticatedClient = await createAuthenticatedClient()
      const addResult = await authenticatedClient.executeOperation({
        query: addUserDocument,
        variables: {
          input: {
            journalArticle: testArticle,
          },
        },
      })
      expect(addResult).toMatchInlineSnapshot(
        {
          data: {
            addUserDocument: {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              id: expect.any(String),
            },
          },
        },
        `
        {
          "data": {
            "addUserDocument": {
              "id": Any<String>,
            },
          },
        }
      `
      )

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const id = addResult.data?.addUserDocument.id as string
      const result = await authenticatedClient.executeOperation({
        query: userDocumentById,
        variables: { id },
      })
      expect(result).toMatchInlineSnapshot(
        {
          data: {
            userDocument: {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              id: expect.any(String),
              in: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                id: expect.any(String),
                journal: {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  id: expect.any(String),
                },
              },
            },
          },
        },
        `
        {
          "data": {
            "userDocument": {
              "__typename": "JournalArticle",
              "abstract": "Some abstract",
              "added": null,
              "annotators": [],
              "authors": [
                {
                  "id": "TODOTest Author",
                  "name": "Test Author",
                },
                {
                  "id": "TODOSecond Test Author",
                  "name": "Second Test Author",
                },
              ],
              "citationKeys": [],
              "commentators": [],
              "doi": "doi which does not exist",
              "electronicId": null,
              "id": Any<String>,
              "in": {
                "id": Any<String>,
                "journal": {
                  "id": Any<String>,
                  "issn": null,
                  "name": "Journal of great things",
                  "subtitle": null,
                  "titleAddon": null,
                },
                "name": null,
                "number": "10",
                "series": null,
                "subtitle": null,
                "title": null,
                "titleAddon": null,
                "volume": "15",
              },
              "keywords": [
                "keyword1",
                "keyword2",
              ],
              "languages": [],
              "lastModified": null,
              "note": null,
              "pageEnd": "2811",
              "pageStart": "2779",
              "publicationState": null,
              "published": "2011",
              "subtitle": null,
              "title": "Test Title",
              "titleAddon": null,
              "translated": null,
            },
          },
        }
      `
      )
    })
    it('updateUserDocument + query', async () => {
      const updateUserDocument = gql`
        mutation UpdateUserDocument($input: UpdateUserDocumentInput!) {
          updateUserDocument(input: $input) {
            id
          }
        }
      `
      const authenticatedClient = await createAuthenticatedClient()
      const updateResult = await authenticatedClient.executeOperation({
        query: updateUserDocument,
        variables: {
          input: {
            id: 'ckondtcaf000101mh7x9g4gia',
            journalArticle: testArticle,
          },
        },
      })
      expect(updateResult).toMatchInlineSnapshot(`
        {
          "data": {
            "updateUserDocument": {
              "id": "ckondtcaf000101mh7x9g4gia",
            },
          },
        }
      `)

      const result = await authenticatedClient.executeOperation({
        query: userDocumentById,
        variables: { id: 'ckondtcaf000101mh7x9g4gia' },
      })
      expect(result).toMatchInlineSnapshot(
        {
          data: {
            userDocument: {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              id: expect.any(String),
              in: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                id: expect.any(String),
                journal: {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  id: expect.any(String),
                },
              },
            },
          },
        },
        `
        {
          "data": {
            "userDocument": {
              "__typename": "JournalArticle",
              "abstract": "Some abstract",
              "added": null,
              "annotators": [],
              "authors": [
                {
                  "id": "TODOTest Author",
                  "name": "Test Author",
                },
                {
                  "id": "TODOSecond Test Author",
                  "name": "Second Test Author",
                },
              ],
              "citationKeys": [],
              "commentators": [],
              "doi": "doi which does not exist",
              "electronicId": null,
              "id": Any<String>,
              "in": {
                "id": Any<String>,
                "journal": {
                  "id": Any<String>,
                  "issn": null,
                  "name": "Journal of great things",
                  "subtitle": null,
                  "titleAddon": null,
                },
                "name": null,
                "number": "10",
                "series": null,
                "subtitle": null,
                "title": null,
                "titleAddon": null,
                "volume": "15",
              },
              "keywords": [
                "keyword1",
                "keyword2",
              ],
              "languages": [],
              "lastModified": null,
              "note": null,
              "pageEnd": "2811",
              "pageStart": "2779",
              "publicationState": null,
              "published": "2011",
              "subtitle": null,
              "title": "Test Title",
              "titleAddon": null,
              "translated": null,
            },
          },
        }
      `
      )
    })
  })
})
