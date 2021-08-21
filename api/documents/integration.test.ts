import { gql } from 'apollo-server-express'
import { createAuthenticatedClient } from '../../test/apollo.server'
import * as prisma from '~/api/database/util'

const authenticatedClient = createAuthenticatedClient()

describe('Query', () => {
  beforeEach(async () => {
    await prisma.resetToSeed()
  })

  afterAll(async () => {
    await prisma.disconnect()
  })

  describe('userDocument', () => {
    const query = gql`
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

    it('retrieves fields for articles in journals', async () => {
      const result = await authenticatedClient.executeOperation({
        query,
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
              "languages": null,
              "lastModified": null,
              "note": null,
              "pageEnd": null,
              "pageStart": null,
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
