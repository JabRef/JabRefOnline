import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { fetch } from '@nuxt/test-utils/e2e'
import { gql } from 'graphql-tag'

const url = '/api'

export function api() {
  const httpLink = new HttpLink({
    uri: url,
    fetch: (input, init) => {
      if (typeof input === 'string') {
        return fetch(input, init)
      } else {
        throw new TypeError('fetch input is not a string')
      }
    },
  })
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
    // Send cookies along with every request (needed for authentication)
    credentials: 'include',
  })
  return apolloClient
}

export async function login(client: ApolloClient<any>) {
  // Supertest automatically saves the cookie in the "request"/agent
  await client.mutate({
    mutation: gql`
      mutation LoginForTests($input: LoginInput!) {
        login(input: $input) {
          ... on UserReturned {
            user {
              id
            }
          }
        }
      }
    `,
    variables: {
      input: { email: 'alice@jabref.org', password: 'EBNPXY35TYkYXHs' },
    },
  })
}
