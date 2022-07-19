import http from 'http'
import 'reflect-metadata' // Needed for tsyringe
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core'
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache'
import { createApp } from 'h3'
import { configure as configureTsyringe } from './tsyringe.config'
import { buildContext } from './context'
import { loadSchemaWithResolvers } from './schema'
import { resolve } from './tsyringe'
import { ApolloServer } from '~/apollo/apollo-server'

// Workaround for issue with Azure deploy: https://github.com/unjs/nitro/issues/351
// Original code taken from https://github.com/nodejs/node/blob/main/lib/_http_outgoing.js
http.OutgoingMessage.prototype.setHeader = function setHeader(name, value) {
  // @ts-ignore: Is workaround anyway
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

  // @ts-ignore: Is workaround anyway
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  let headers = this[kOutHeaders]
  // CHANGED: === to == to cover undefined case
  if (headers == null) {
    // @ts-ignore: Is workaround anyway
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this[kOutHeaders] = headers = Object.create(null)
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  headers[name.toLowerCase()] = [name, value]
  return this
}

const app = createApp()
// eslint-disable-next-line @typescript-eslint/no-misused-promises
const httpServer = http.createServer(app)

export default defineLazyEventHandler(async () => {
  await configureTsyringe()

  const passportInitializer = resolve('PassportInitializer')
  passportInitializer.initialize()
  passportInitializer.install(app)

  const server = new ApolloServer({
    schema: await loadSchemaWithResolvers(),
    context: buildContext,
    introspection: true,
    plugins: [
      // Enable Apollo Studio in development, and also in production (at least for now)
      ApolloServerPluginLandingPageLocalDefault({ footer: false }),
      // Gracefully shutdown HTTP server when Apollo server terminates
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
    // Only reply to requests with a Content-Type header to prevent CSRF and XS-Search attacks
    // https://www.apollographql.com/docs/apollo-server/security/cors/#preventing-cross-site-request-forgery-csrf
    csrfPrevention: true,
    cache: new InMemoryLRUCache(),
  })

  await server.start()
  return server.createHandler()
})
