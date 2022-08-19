import type { GraphQLOptions } from 'apollo-server-core'
import {
  ApolloServerBase,
  convertNodeHttpToRequest,
  isHttpQueryError,
  runHttpQuery,
} from 'apollo-server-core'
import type { LandingPage } from 'apollo-server-plugin-base'
import { CompatibilityEvent, EventHandler, useBody, useQuery } from 'h3'

// Manually specify CORS options as long as h3 doesn't suppor this natively
// https://github.com/unjs/h3/issues/82
interface RouteOptionsCors {
  origin?: string
  credentials?: boolean
  methods?: string
}

export interface ServerRegistration {
  path?: string
  disableHealthCheck?: boolean
  onHealthCheck?: (event: CompatibilityEvent) => Promise<any>
  cors?: boolean | RouteOptionsCors
}

// Originally taken from https://github.com/newbeea/nuxt3-apollo-starter/blob/master/server/graphql/apollo-server.ts
// TODO: Implement health check https://github.com/apollographql/apollo-server/blob/main/docs/source/monitoring/health-checks.md
export class ApolloServer extends ApolloServerBase {
  async createGraphQLServerOptions(
    event: CompatibilityEvent
  ): Promise<GraphQLOptions> {
    return this.graphQLServerOptions(event)
  }

  createHandler({
    path,
    disableHealthCheck,
    onHealthCheck,
    cors,
  }: ServerRegistration = {}): EventHandler {
    this.graphqlPath = path || '/graphql'
    // Provide false to remove CORS middleware entirely, or true to use your middleware's default configuration.
    const corsOptions =
      cors === true || cors === undefined ? { origin: 'ignore' } : cors
    const landingPage = this.getLandingPage()

    return async (event: CompatibilityEvent) => {
      const options = await this.createGraphQLServerOptions(event)
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
        setHeaders(event, responseInit.headers, corsOptions)
        event.res.statusCode = responseInit.status || 200
        return graphqlResponse
      } catch (error: any) {
        if (!isHttpQueryError(error)) {
          throw error
        }
        setHeaders(event, error.headers, corsOptions)
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
function setHeaders(
  event: CompatibilityEvent,
  headers: Record<string, string> | undefined,
  corsOptions: false | RouteOptionsCors
) {
  if (headers) {
    for (const [name, value] of Object.entries(headers)) {
      event.res.setHeader(name, value)
    }
  }
  if (corsOptions !== false) {
    event.res.setHeader(
      'Access-Control-Allow-Origin',
      corsOptions.origin ?? 'ignore'
    )
    if (corsOptions.credentials !== undefined) {
      event.res.setHeader(
        'Access-Control-Allow-Credentials',
        corsOptions.credentials.toString()
      )
    }
    if (corsOptions.methods !== undefined) {
      event.res.setHeader('Access-Control-Allow-Methods', corsOptions.methods)
    }
  }
}
