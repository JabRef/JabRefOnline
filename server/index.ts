import http from 'http'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import 'reflect-metadata' // Needed for tsyringe
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core'
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache'
import { Environment } from '../config'
import { configure as configureTsyringe } from './tsyringe.config'
import { buildContext } from './context'
import { loadSchemaWithResolvers } from './schema'
import { resolve } from './tsyringe'

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

// Create express instance
const app = express()
if (useRuntimeConfig().public.environment === Environment.Production) {
  // Azure uses a reverse proxy, which changes some API values (notably express things it is not accessed through a secure https connection)
  // So we need to adjust for this, see http://expressjs.com/en/guide/behind-proxies.html
  app.set('trust proxy', 1)
}
const httpServer = http.createServer(app)

// TODO: Replace this with await, once esbuild supports top-level await
void configureTsyringe()
  .then(async () => {
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

    async function startServer() {
      await server.start()
      server.applyMiddleware({ app, path: '/' })
    }
    void startServer()
  })
  .catch((error) => {
    console.error('Error while executing configureTsyringe', error)
  })

export default app
