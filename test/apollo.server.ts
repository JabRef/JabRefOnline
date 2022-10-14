import { ApolloServer, GraphQLRequest, GraphQLResponse } from '@apollo/server'
import { VariableValues } from '@apollo/server/dist/esm/externalTypes/graphql'
import { DocumentNode, TypedQueryDocumentNode } from 'graphql'
import { Context } from '~/server/context'
import { loadSchemaFromFilesWithResolvers } from '~/server/schema'
import { resolve } from '~/server/tsyringe'

export type ApolloClient = {
  executeOperation<
    TData = Record<string, unknown>,
    TVariables extends VariableValues = VariableValues
  >(
    request: Omit<GraphQLRequest<TVariables>, 'query'> & {
      query?: string | DocumentNode | TypedQueryDocumentNode<TData, TVariables>
    }
  ): Promise<GraphQLResponse<TData>>
}

export async function createAuthenticatedClient(): Promise<ApolloClient> {
  const server = new ApolloServer<Context>({
    schema: await loadSchemaFromFilesWithResolvers(),
    includeStacktraceInErrorResponses: true,
  })

  const user = await resolve('AuthService').getUserById(
    'ckn4oul7100004cv7y3t94n8j'
  )

  return {
    executeOperation: async (operation) => {
      return await server.executeOperation(operation, {
        contextValue: {
          getUser: () => user,
          isAuthenticated: () => true,
          isUnauthenticated: () => false,
          authenticate: (_strategyName) => {
            throw new Error('Not implemented')
          },
          login: () => {
            throw new Error('Not implemented')
          },
          logout: () => {
            throw new Error('Not implemented')
          },
        },
      })
    },
  }
}
