import type { ServerResponse } from 'http'
import type { LandingPage } from 'apollo-server-plugin-base'
import {
  useBody,
  useQuery,
  IncomingMessage,
  CompatibilityEvent,
  EventHandler,
} from 'h3'
import type { GraphQLOptions } from 'apollo-server-core'
import {
  ApolloServerBase,
  convertNodeHttpToRequest,
  runHttpQuery,
  isHttpQueryError,
} from 'apollo-server-core'

export interface ServerRegistration {
  path?: string
  disableHealthCheck?: boolean
  onHealthCheck?: (event: CompatibilityEvent) => Promise<any>
}

// Originally taken from https://github.com/newbeea/nuxt3-apollo-starter/blob/master/server/graphql/apollo-server.ts
// TODO: Implement health check https://github.com/apollographql/apollo-server/blob/main/docs/source/monitoring/health-checks.md
export class ApolloServer extends ApolloServerBase {
  async createGraphQLServerOptions(
    request?: IncomingMessage,
    reply?: ServerResponse
  ): Promise<GraphQLOptions> {
    return this.graphQLServerOptions({ request, reply })
  }

  createHandler({
    path,
    disableHealthCheck,
    onHealthCheck,
  }: ServerRegistration = {}): EventHandler {
    this.graphqlPath = path || '/graphql'
    const landingPage = this.getLandingPage()

    return async (event: CompatibilityEvent) => {
      const options = await this.createGraphQLServerOptions(
        event.req,
        event.res
      )
      try {
        if (landingPage) {
          const landingPageHtml = this.handleLandingPage(event, landingPage)
          if (landingPageHtml) {
            return landingPageHtml
          }
        }

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
        if (!isHttpQueryError(error)) {
          throw error
        }

        if (error.headers) {
          for (const [name, value] of Object.entries<string>(error.headers))
            event.res.setHeader(name, value)
        }
        event.res.statusCode = error.statusCode || 500
        return error.message
      }
    }
  }

  private handleLandingPage(
    event: CompatibilityEvent,
    landingPage: LandingPage
  ): string | undefined {
    const url = event.req.url?.split('?')[0]
    if (event.req.method === 'GET' && url === this.graphqlPath) {
      const prefersHtml = event.req.headers.accept?.includes('text/html')

      if (prefersHtml) {
        return landingPage.html
      }
    }
  }
}

export default ApolloServer
