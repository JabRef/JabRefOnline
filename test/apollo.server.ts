import {
  ApolloServer,
  type GraphQLRequest,
  type GraphQLResponse,
} from '@apollo/server'
import type { VariableValues } from '@apollo/server/dist/esm/externalTypes/graphql'
import type { DocumentNode, TypedQueryDocumentNode } from 'graphql'
import type { Context } from '~/server/context'
import { loadSchemaWithResolvers } from '~/server/schema'
import { resolve } from '~/server/tsyringe'

export interface ApolloClient {
  executeOperation<
    TData = Record<string, unknown>,
    TVariables extends VariableValues = VariableValues,
  >(
    request: Omit<GraphQLRequest<TVariables>, 'query'> & {
      query?: string | DocumentNode | TypedQueryDocumentNode<TData, TVariables>
    },
  ): Promise<GraphQLResponse<TData>>
}

export async function createAuthenticatedClient(): Promise<ApolloClient> {
  const server = new ApolloServer<Context>({
    schema: await loadSchemaWithResolvers(),
    includeStacktraceInErrorResponses: true,
  })

  const user = await resolve('AuthService').getUserById(
    'ckn4oul7100004cv7y3t94n8j',
  )

  return {
    executeOperation: async (operation) => {
      return await server.executeOperation(operation, {
        contextValue: {
          getUser: () => Promise.resolve(user),
          setSession: () => {
            throw new Error('Not implemented')
          },
        },
      })
    },
  }
}
