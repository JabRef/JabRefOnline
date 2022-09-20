import type { GraphQLOptions } from 'apollo-server-core'
import {
  ApolloServerBase,
  convertNodeHttpToRequest,
  isHttpQueryError,
  runHttpQuery,
} from 'apollo-server-core'
import type { LandingPage } from 'apollo-server-plugin-base'
import {
  CompatibilityEvent,
  EventHandler,
  getQuery,
  readBody,
  setResponseHeader,
  setResponseHeaders,
} from 'h3'

export { gql } from 'apollo-server-core'

// Manually specify CORS options as long as h3 doesn't support this natively
// https://github.com/unjs/h3/issues/82
interface RouteOptionsCors {
  origin?: string
  credentials?: boolean
  methods?: string
  allowedHeaders?: string
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
        // Apollo-server doesn't handle OPTIONS calls, so we have to do this on our own
        // https://github.com/apollographql/apollo-server/blob/40ed23fbb5dd620902d7c31bcc1e26e098990041/packages/apollo-server-core/src/runHttpQuery.ts#L325-L334
        if (event.req.method === 'OPTIONS') {
          setHeaders(event, undefined, corsOptions)
          // send 204 response
          return null
        }

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
              ? await readBody(event)
              : getQuery(event),
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
    setResponseHeaders(event, headers)
  }
  if (corsOptions !== false) {
    setResponseHeader(
      event,
      'Access-Control-Allow-Origin',
      corsOptions.origin ?? 'ignore'
    )

    if (corsOptions.credentials !== undefined) {
      setResponseHeader(
        event,
        'Access-Control-Allow-Credentials',
        corsOptions.credentials.toString()
      )
    }
    if (corsOptions.methods !== undefined) {
      setResponseHeader(
        event,
        'Access-Control-Allow-Methods',
        corsOptions.methods
      )
    }
    if (corsOptions.allowedHeaders !== undefined) {
      setResponseHeader(
        event,
        'Access-Control-Allow-Headers',
        corsOptions.allowedHeaders
      )
    }
  }
}
