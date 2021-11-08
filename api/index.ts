import http from 'http'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import './tsyringe.config'
import { container } from 'tsyringe'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core'
import { config, Environment } from '../config'
import { buildContext } from './context'
import { loadSchema } from './schema'
import PassportInitializer from './user/passport-initializer'

// Create express instance
const app = express()
if (config.environment === Environment.Production) {
  // Azure uses a reverse proxy, which changes some API values (notably express things it is not accessed through a secure https connection)
  // So we need to adjust for this, see http://expressjs.com/en/guide/behind-proxies.html
  app.set('trust proxy', 1)
}
const httpServer = http.createServer(app)

const passportInitializer = container.resolve(PassportInitializer)
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
})

async function startServer() {
  await server.start()
  server.applyMiddleware({ app, path: '/' })
}
void startServer()

module.exports = app
