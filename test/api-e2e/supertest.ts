import { gql } from 'graphql-tag'
import supertestRequest from 'supertest'
import supertestGraphql, {
  SuperTestGraphQL,
  Variables,
} from 'supertest-graphql'

export function api(): SuperTestGraphQL<unknown, Variables> {
  return supertestGraphql('localhost:3000').path('/api')
}
export function root() {
  return supertestRequest('localhost:3000')
}

export async function login(request: SuperTestGraphQL<unknown, Variables>) {
  // Supertest automatically saves the cookie in the "request"/agent
  await request
    .mutate(
      gql`
        mutation LoginForTests($input: LoginInput!) {
          login(input: $input) {
            ... on UserReturned {
              user {
                id
              }
            }
          }
        }
      `
    )
    .variables({
      input: { email: 'alice@jabref.de', password: 'EBNPXY35TYkYXHs' },
    })
}
