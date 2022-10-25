import { gql } from 'graphql-tag'
import * as prisma from '~/server/database/util'
import { createAuthenticatedClient } from '~/test/apollo.server'
import { removeIds } from '~/test/util'

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
      family
      given
      suffix
      nonDroppingParticle
      droppingParticle
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
      expect(result.body).toMatchInlineSnapshot(`
        {
          "kind": "single",
          "singleResult": {
            "data": {
              "userDocument": {
                "__typename": "JournalArticle",
                "abstract": "Epidemiological data demonstrate that regular dietary intake of plant-derived foods and beverages reduces the risk of coronary heart disease and stroke. Among many ingredients, cocoa might be an important mediator. Indeed, recent research demonstrates a beneficial effect of cocoa on blood pressure, insulin resistance, and vascular and platelet function. Although still debated, a range of potential mechanisms through which cocoa might exert its benefits on cardiovascular health have been proposed, including activation of nitric oxide and antioxidant and antiinflammatory effects. This review summarizes the available data on the cardiovascular effects of cocoa, outlines potential mechanisms involved in the response to cocoa, and highlights the potential clinical implications associated with its consumption. ( Circulation. 2009; 119: 1433-1441.)",
                "added": 2000-01-01T00:00:00.000Z,
                "annotators": [],
                "authors": [
                  {
                    "droppingParticle": null,
                    "family": "Corti",
                    "given": "Roberto",
                    "id": "cl9n6ya8a00fokmtk3e3h9qsh",
                    "nonDroppingParticle": null,
                    "suffix": null,
                  },
                  {
                    "droppingParticle": null,
                    "family": "Flammer",
                    "given": "Andreas J.",
                    "id": "cl9n6ya8a00fqkmtk5b0t52mu",
                    "nonDroppingParticle": null,
                    "suffix": null,
                  },
                  {
                    "droppingParticle": null,
                    "family": "Hollenberg",
                    "given": "Norman K.",
                    "id": "cl9n6ya8a00fskmtkytfgznx0",
                    "nonDroppingParticle": null,
                    "suffix": null,
                  },
                  {
                    "droppingParticle": null,
                    "family": "Luscher",
                    "given": "Thomas F.",
                    "id": "cl9n6ycni00jjkmtksyuppbsm",
                    "nonDroppingParticle": null,
                    "suffix": null,
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
                "lastModified": 2021-01-01T00:00:00.000Z,
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
            "errors": undefined,
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
        { person: { family: 'Test Author' } },
        { person: { family: 'Second Test Author' } },
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
      expect(addResult.body).toMatchInlineSnapshot(
        {
          singleResult: {
            data: {
              addUserDocument: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                id: expect.any(String),
              },
            },
          },
        },
        `
        {
          "kind": "single",
          "singleResult": {
            "data": {
              "addUserDocument": {
                "id": Any<String>,
              },
            },
            "errors": undefined,
          },
        }
      `
      )

      if (addResult.body.kind !== 'single') {
        throw new Error('Expected single result')
      }
      // @ts-expect-error --- is not a typed graphql doc
      const id = addResult.body.singleResult.data?.addUserDocument.id as string
      const result = await authenticatedClient.executeOperation({
        query: userDocumentById,
        variables: { id },
      })
      expect(removeIds(result.body)).toMatchInlineSnapshot(
        {
          singleResult: {
            data: {
              userDocument: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                added: expect.any(Date),
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                lastModified: expect.any(Date),
              },
            },
          },
        },
        `
        {
          "kind": "single",
          "singleResult": {
            "data": {
              "userDocument": {
                "__typename": "JournalArticle",
                "abstract": "Some abstract",
                "added": Any<Date>,
                "annotators": [],
                "authors": [
                  {
                    "droppingParticle": null,
                    "family": "Test Author",
                    "given": null,
                    "nonDroppingParticle": null,
                    "suffix": null,
                  },
                  {
                    "droppingParticle": null,
                    "family": "Second Test Author",
                    "given": null,
                    "nonDroppingParticle": null,
                    "suffix": null,
                  },
                ],
                "citationKeys": [],
                "commentators": [],
                "doi": "doi which does not exist",
                "electronicId": null,
                "in": {
                  "journal": {
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
                "lastModified": Any<Date>,
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
            "errors": undefined,
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
      expect(updateResult.body).toMatchInlineSnapshot(`
        {
          "kind": "single",
          "singleResult": {
            "data": {
              "updateUserDocument": {
                "id": "ckondtcaf000101mh7x9g4gia",
              },
            },
            "errors": undefined,
          },
        }
      `)

      const result = await authenticatedClient.executeOperation({
        query: userDocumentById,
        variables: { id: 'ckondtcaf000101mh7x9g4gia' },
      })
      expect(removeIds(result.body)).toMatchInlineSnapshot(
        `
        {
          "kind": "single",
          "singleResult": {
            "data": {
              "userDocument": {
                "__typename": "JournalArticle",
                "abstract": "Some abstract",
                "added": 2000-01-01T00:00:00.000Z,
                "annotators": [],
                "authors": [
                  {
                    "droppingParticle": null,
                    "family": "Test Author",
                    "given": null,
                    "nonDroppingParticle": null,
                    "suffix": null,
                  },
                  {
                    "droppingParticle": null,
                    "family": "Second Test Author",
                    "given": null,
                    "nonDroppingParticle": null,
                    "suffix": null,
                  },
                ],
                "citationKeys": [],
                "commentators": [],
                "doi": "doi which does not exist",
                "electronicId": null,
                "in": {
                  "journal": {
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
                "lastModified": 2021-01-01T00:00:00.000Z,
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
            "errors": undefined,
          },
        }
      `
      )
    })
  })
})
