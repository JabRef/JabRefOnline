import http from 'http'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import 'reflect-metadata' // Needed for tsyringe
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core'
import { Environment } from '../config'
import { configure as configureTsyringe } from './tsyringe.config'
import { buildContext } from './context'
import { loadSchema } from './schema'
import { resolve } from './tsyringe'

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
  .then(() => {
    const passportInitializer = resolve('PassportInitializer')
    passportInitializer.initialize()
    passportInitializer.install(app)

    const server = new ApolloServer({
      schema: loadSchema(),
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
