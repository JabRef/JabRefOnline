import type { ServerResponse } from 'http'
import {
  useBody,
  useQuery,
  IncomingMessage,
  CompatibilityEvent,
  sendError,
  EventHandler,
} from 'h3'
import type { GraphQLOptions } from 'apollo-server-core'
import {
  ApolloServerBase,
  convertNodeHttpToRequest,
  runHttpQuery,
} from 'apollo-server-core'

// Originally taken from https://github.com/newbeea/nuxt3-apollo-starter/blob/master/server/graphql/apollo-server.ts
// TODO: Implement health check https://github.com/apollographql/apollo-server/blob/main/docs/source/monitoring/health-checks.md
// TODO: Implement landing page
export class ApolloServer extends ApolloServerBase {
  async createGraphQLServerOptions(
    request?: IncomingMessage,
    reply?: ServerResponse
  ): Promise<GraphQLOptions> {
    return this.graphQLServerOptions({ request, reply })
  }

  createHandler(): EventHandler {
    return async (event: CompatibilityEvent) => {
      const options = await this.createGraphQLServerOptions(
        event.req,
        event.res
      )
      try {
        const { graphqlResponse, responseInit } = await runHttpQuery([], {
          method: event.req.method || 'GET',
          options,
          query:
            event.req.method === 'POST'
              ? await useBody(event)
              : useQuery(event),
          request: convertNodeHttpToRequest(event.req),
        })
        if (responseInit.headers) {
          for (const [name, value] of Object.entries<string>(
            responseInit.headers
          ))
            event.res.setHeader(name, value)
        }
        event.res.statusCode = responseInit.status || 200
        return graphqlResponse
      } catch (error: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (error.headers) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          for (const [name, value] of Object.entries<string>(error.headers))
            event.res.setHeader(name, value)
        }
        sendError(
          event,
          createError({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
            statusCode: error.statusCode || 500,
            statusMessage: (error as Error).message,
          })
        )
      }
    }
  }
}

export default ApolloServer
