import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import './tsyringe.config'
import { container } from 'tsyringe'
import { buildContext } from './context'
import { loadSchema } from './schema'
import PassportInitializer from './user/passport-initializer'

// Create express instance
const app = express()

const passportInitializer = container.resolve(PassportInitializer)
passportInitializer.initialize()
passportInitializer.install(app)

export const server = new ApolloServer({
  schema: loadSchema(),
  context: buildContext,
  // Enable playground also in production (at least for now)
  introspection: true,
  playground: true,
})
server.applyMiddleware({ app, path: '/' })

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}
