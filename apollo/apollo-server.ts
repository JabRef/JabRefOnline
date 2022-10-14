import type {
  ApolloServer,
  BaseContext,
  ContextFunction,
  HTTPGraphQLRequest,
} from '@apollo/server'
import type { WithRequired } from '@apollo/utils.withrequired'
import {
  eventHandler,
  EventHandler,
  getHeaders,
  H3Event,
  HTTPMethod,
  readBody,
} from 'h3'
import type { IncomingHttpHeaders } from 'http'

export interface H3ContextFunctionArgument {
  event: H3Event
}

export interface H3HandlerOptions<TContext extends BaseContext> {
  context?: ContextFunction<[H3ContextFunctionArgument], TContext>
}

export function startServerAndCreateH3Handler(
  server: ApolloServer<BaseContext>,
  options?: H3HandlerOptions<BaseContext>
): EventHandler
export function startServerAndCreateH3Handler<TContext extends BaseContext>(
  server: ApolloServer<TContext>,
  options: WithRequired<H3HandlerOptions<TContext>, 'context'>
): EventHandler
export function startServerAndCreateH3Handler<TContext extends BaseContext>(
  server: ApolloServer<TContext>,
  options?: H3HandlerOptions<TContext>
): EventHandler {
  server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests()

  const defaultContext: ContextFunction<
    [H3ContextFunctionArgument],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This `any` is safe because the overload above shows that context can only be left out if you're using BaseContext as your context, and {} is a valid BaseContext.
    any
  > = () => Promise.resolve({})

  const contextFunction: ContextFunction<
    [H3ContextFunctionArgument],
    TContext
  > = options?.context ?? defaultContext

  return eventHandler(async (event) => {
    // Apollo-server doesn't handle OPTIONS calls, so we have to do this on our own
    // https://github.com/apollographql/apollo-server/blob/fa82c1d5299c4803f9ef8ae7fa2e367eadd8c0e6/packages/server/src/runHttpQuery.ts#L182-L192
    if (isMethod(event, 'OPTIONS')) {
      // send 204 response
      return null
    }

    const { body, headers, status } = await server.executeHTTPGraphQLRequest({
      httpGraphQLRequest: await toGraphqlRequest(event),
      context: () => contextFunction({ event }),
    })

    if (body.kind === 'chunked') {
      throw new Error('Incremental delivery not implemented')
    }

    setHeaders(event, Object.fromEntries(headers))
    event.res.statusCode = status || 200
    return body.string
  })
}

async function toGraphqlRequest(event: H3Event): Promise<HTTPGraphQLRequest> {
  return {
    method: event.req.method || 'POST',
    headers: normalizeHeaders(getHeaders(event)),
    search: normalizeQueryString(event.req.url),
    body: await normalizeBody(event),
  }
}

function normalizeHeaders(headers: IncomingHttpHeaders): Map<string, string> {
  const headerMap = new Map<string, string>()
  for (const [key, value] of Object.entries(headers)) {
    if (Array.isArray(value)) {
      headerMap.set(key, value.join(','))
    } else if (value) {
      headerMap.set(key, value)
    }
  }
  return headerMap
}

function normalizeQueryString(url: string | undefined): string {
  if (!url) {
    return ''
  }
  return url.split('?')[1] || ''
}

async function normalizeBody(event: H3Event): Promise<string | undefined> {
  const PayloadMethods: HTTPMethod[] = ['PATCH', 'POST', 'PUT', 'DELETE']
  if (isMethod(event, PayloadMethods)) {
    return await readBody(event)
  }
}
