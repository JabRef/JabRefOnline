import {
  type DocumentNode,
  type OperationVariables,
  type TypedDocumentNode,
} from '@apollo/client/core'
import { fetch } from '@nuxt/test-utils/e2e'
import { print, type GraphQLError } from 'graphql'
import { gql } from 'graphql-tag'

/**
 * Consider replacing by https://github.com/jasonkuhrt/graphql-request,
 * which however at the moment doesn't allow to specify a custom fetch implementation.
 */
export class Api {
  constructor(private path = '/api') {}

  async mutate<TData, TVariables extends OperationVariables>(options: {
    /**
     * A GraphQL document containing the single mutation the client should execute.
     */
    mutation: DocumentNode | TypedDocumentNode<TData, TVariables>
    /**
     * An object containing all of the GraphQL variables your mutation requires to execute.
     *
     * Each key in the object corresponds to a variable name, and that key's value corresponds to the variable value.
     */
    variables?: TVariables
    cookies?: string[]
  }) {
    return await this.operation<TData, TVariables>({
      query: print(options.mutation),
      variables: options.variables,
      cookies: options.cookies,
    })
  }

  async query<TData, TVariables extends OperationVariables>(options: {
    /**
     * A GraphQL document containing the single query the client should execute.
     */
    query: DocumentNode | TypedDocumentNode<TData, TVariables>
    /**
     * An object containing all of the GraphQL variables your query requires to execute.
     *
     * Each key in the object corresponds to a variable name, and that key's value corresponds to the variable value.
     */
    variables?: TVariables
    cookies?: string[]
  }) {
    return await this.operation<TData, TVariables>({
      query: print(options.query),
      variables: options.variables,
      cookies: options.cookies,
    })
  }

  private async operation<
    TData,
    TVariables extends OperationVariables,
  >(options: { query: string; variables?: TVariables; cookies?: string[] }) {
    const body = {
      query: options.query,
      variables: options.variables,
    }
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (options.cookies) {
      headers.Cookie = options.cookies.join('; ')
    }
    const response = await fetch(this.path, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })

    const json = (await response.json()) as {
      errors?: GraphQLError[]
      data?: TData
    }
    return {
      errors: json.errors,
      data: json.data,
      rawResponse: response,
    }
  }
}

export function api() {
  return new Api()
}

/**
 * Logs in a user and returns the session cookies set by the server.
 */
export async function login(client: Api) {
  const { rawResponse } = await client.mutate({
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
  return {
    cookies: rawResponse.headers.getSetCookie(),
  }
}
