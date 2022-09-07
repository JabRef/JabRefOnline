import { gql } from '~/apollo/apollo-server'
import * as prisma from '~/server/database/util'
import { createAuthenticatedClient } from '../../test/apollo.server'

const authenticatedClient = await createAuthenticatedClient()

beforeEach(async () => {
  await prisma.resetToSeed()
})

afterAll(async () => {
  await prisma.disconnect()
})

const userDocumentById = gql`
  fragment EntityFragment on Entity {
    ... on Person {
      id
      name
    }
    ... on Organization {
      id
      name
    }
  }
  query userDocumentById($id: ID!) {
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
        ...EntityFragment
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
            ...EntityFragment
          }
        }
        published
        annotators {
          ...EntityFragment
        }
        commentators {
          ...EntityFragment
        }
      }
    }
  }
`

describe('Query', () => {
  describe('userDocument', () => {
    it('retrieves fields for articles in journals', async () => {
      const result = await authenticatedClient.executeOperation({
        query: userDocumentById,
        variables: { id: 'ckondtcaf000101mh7x9g4gia' },
      })
      expect(result).toMatchInlineSnapshot(`
        Object {
          "data": Object {
            "userDocument": Object {
              "__typename": "JournalArticle",
              "abstract": "Epidemiological data demonstrate that regular dietary intake of plant-derived foods and beverages reduces the risk of coronary heart disease and stroke. Among many ingredients, cocoa might be an important mediator. Indeed, recent research demonstrates a beneficial effect of cocoa on blood pressure, insulin resistance, and vascular and platelet function. Although still debated, a range of potential mechanisms through which cocoa might exert its benefits on cardiovascular health have been proposed, including activation of nitric oxide and antioxidant and antiinflammatory effects. This review summarizes the available data on the cardiovascular effects of cocoa, outlines potential mechanisms involved in the response to cocoa, and highlights the potential clinical implications associated with its consumption. ( Circulation. 2009; 119: 1433-1441.)",
              "added": null,
              "annotators": Array [],
              "authors": Array [
                Object {
                  "id": "TODOCorti, Roberto",
                  "name": "Corti, Roberto",
                },
                Object {
                  "id": "TODOFlammer, Andreas J.",
                  "name": "Flammer, Andreas J.",
                },
                Object {
                  "id": "TODOHollenberg, Norman K.",
                  "name": "Hollenberg, Norman K.",
                },
                Object {
                  "id": "TODOLuscher, Thomas F.",
                  "name": "Luscher, Thomas F.",
                },
              ],
              "citationKeys": Array [],
              "commentators": Array [],
              "doi": "10.1161/CIRCULATIONAHA.108.827022",
              "electronicId": null,
              "id": "ckondtcaf000101mh7x9g4gia",
              "in": Object {
                "id": "ckslizms5000109jv3yx80ujf",
                "journal": Object {
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
              "keywords": Array [
                "cocoa",
                "endothelium",
                "hypertension",
                "platelets",
              ],
              "languages": Array [],
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
        mutation addUserDocument($input: AddUserDocumentInput!) {
          addUserDocument(input: $input) {
            id
          }
        }
      `
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
        Object {
          "data": Object {
            "addUserDocument": Object {
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
        Object {
          "data": Object {
            "userDocument": Object {
              "__typename": "JournalArticle",
              "abstract": "Some abstract",
              "added": null,
              "annotators": Array [],
              "authors": Array [
                Object {
                  "id": "TODOTest Author",
                  "name": "Test Author",
                },
                Object {
                  "id": "TODOSecond Test Author",
                  "name": "Second Test Author",
                },
              ],
              "citationKeys": Array [],
              "commentators": Array [],
              "doi": "doi which does not exist",
              "electronicId": null,
              "id": Any<String>,
              "in": Object {
                "id": Any<String>,
                "journal": Object {
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
              "keywords": Array [
                "keyword1",
                "keyword2",
              ],
              "languages": Array [],
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
        mutation updateUserDocument($input: UpdateUserDocumentInput!) {
          updateUserDocument(input: $input) {
            id
          }
        }
      `
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
        Object {
          "data": Object {
            "updateUserDocument": Object {
              "id": "ckondtcaf000101mh7x9g4gia",
            },
          },
        }
      `)

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
        Object {
          "data": Object {
            "userDocument": Object {
              "__typename": "JournalArticle",
              "abstract": "Some abstract",
              "added": null,
              "annotators": Array [],
              "authors": Array [
                Object {
                  "id": "TODOTest Author",
                  "name": "Test Author",
                },
                Object {
                  "id": "TODOSecond Test Author",
                  "name": "Second Test Author",
                },
              ],
              "citationKeys": Array [],
              "commentators": Array [],
              "doi": "doi which does not exist",
              "electronicId": null,
              "id": Any<String>,
              "in": Object {
                "id": Any<String>,
                "journal": Object {
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
              "keywords": Array [
                "keyword1",
                "keyword2",
              ],
              "languages": Array [],
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
