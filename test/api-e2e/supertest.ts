import { gql } from 'graphql-tag'
import supertestRequest from 'supertest'
import supertestGraphql, {
  SuperTestGraphQL,
  Variables,
} from 'supertest-graphql'

const url = process.env.TEST_URL || 'http://localhost:3000'

export function api(): SuperTestGraphQL<unknown, Variables> {
  // @ts-expect-error: Vitest has currently problems with commonjs imports: https://github.com/vitest-dev/vitest/issues/2258 and https://github.com/vitest-dev/vitest/issues/2120
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  return supertestGraphql.default(url).path('/api')
}
export function root() {
  return supertestRequest(url)
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
      input: { email: 'alice@jabref.org', password: 'EBNPXY35TYkYXHs' },
    })
}
