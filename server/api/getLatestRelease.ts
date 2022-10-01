/* eslint-disable @graphql-eslint/fields-on-correct-type */
import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client/core'

const config = useRuntimeConfig()
const github = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      Authorization: `Bearer ${config.githubRepoToken}`,
    },
  }),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
})

export default defineEventHandler(async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = await github.query({
    query: gql(`
    query LatestRelease { 
        # eslint-disable-next-line @graphql-eslint/fields-on-correct-type
        repository(owner: "JabRef", name: "jabref") {
          releases(first: 1, orderBy: { field: CREATED_AT, direction: DESC }) {
            nodes {
              tagName
            }
          }
        }
      }
    `),
  })
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    version: (data.repository.releases.nodes[0].tagName as string).replace(
      'v',
      ''
    ), // something like 5.7
  }
})
