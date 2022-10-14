import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache'
import { defineCorsEventHandler } from '@nozomuikuta/h3-cors'
import http from 'http'
import 'reflect-metadata' // Needed for tsyringe
import { startServerAndCreateH3Handler } from '~/apollo/apollo-server'
import { buildContext, Context } from './context'
import { loadSchemaWithResolvers } from './schema'

// Workaround for issue with Azure deploy: https://github.com/unjs/nitro/issues/351
// Original code taken from https://github.com/nodejs/node/blob/main/lib/_http_outgoing.js
http.OutgoingMessage.prototype.setHeader = function setHeader(name, value) {
  // @ts-expect-error: Is workaround anyway
  if (this._header) {
    // CHANGED: Don't throw an error in this case, as workaround for https://github.com/unjs/h3/issues/21
    // throw new Error('Cannot set headers after they are sent to the client')
  }
  // CHANGED: No idea where to find these methods
  // validateHeaderName(name)
  // validateHeaderValue(name, value)

  // CHANGED: Extra logic to find kOutHeaders symbol in `this`
  const kOutHeaders = Object.getOwnPropertySymbols(this).find(
    (sym) => sym.toString() === 'Symbol(kOutHeaders)'
  )

  // @ts-expect-error: Is workaround anyway
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  let headers = this[kOutHeaders]
  // CHANGED: === to == to cover undefined case
  if (headers == null) {
    // @ts-expect-error: Is workaround anyway
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this[kOutHeaders] = headers = Object.create(null)
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  headers[name.toLowerCase()] = [name, value]
  return this
}

// Workaround for issue with Azure deploy: https://github.com/unjs/nitro/issues/351
// Original code taken from https://github.com/nodejs/node/blob/main/lib/internal/streams/readable.js
http.IncomingMessage.Readable.prototype.unpipe = function (dest) {
  // CHANGED: Add fallback if not existing
  // @ts-expect-error: is workaround anyway
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const state = (this._readableState as any) || { pipes: [] }
  const unpipeInfo = { hasUnpiped: false }

  // If we're not piping anywhere, then do nothing.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (state.pipes.length === 0) return this

  if (!dest) {
    // remove all.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const dests = state.pipes as any[]
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    state.pipes = []
    this.pause()

    for (let i = 0; i < dests.length; i++)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      dests[i].emit('unpipe', this, { hasUnpiped: false })
    return this
  }

  // Try to find the right one.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const index = state.pipes.indexOf(dest)
  if (index === -1) return this

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  state.pipes.splice(index, 1)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (state.pipes.length === 0) this.pause()

  dest.emit('unpipe', this, unpipeInfo)

  return this
}

export default defineLazyEventHandler(async () => {
  const server = new ApolloServer<Context>({
    schema: await loadSchemaWithResolvers(),
    introspection: true,
    plugins: [
      // Enable Apollo Studio in development, and also in production (at least for now)
      ApolloServerPluginLandingPageLocalDefault({ footer: false }),
      // TODO: Gracefully shutdown HTTP server when Apollo server terminates
      // ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
    // Only reply to requests with a Content-Type header to prevent CSRF and XS-Search attacks
    // https://www.apollographql.com/docs/apollo-server/security/cors/#preventing-cross-site-request-forgery-csrf
    csrfPrevention: true,
    cache: new InMemoryLRUCache(),
    includeStacktraceInErrorResponses: true,
  })
  const serverHandler = startServerAndCreateH3Handler(server, {
    context: buildContext,
  })
  const corsHandler = defineCorsEventHandler({
    methods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
    // Allow requests from Apollo Studio: https://www.apollographql.com/docs/studio/explorer/connecting-authenticating/
    origin: ['https://studio.apollographql.com'],
    credentials: true,
  })

  return eventHandler((event) => {
    corsHandler(event)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return serverHandler(event)
  })
})
