import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import { PrismaClient } from '@prisma/client'

import { buildContext } from './context'

// Require API routes
import users from './routes/users'
import test from './routes/test'
import resolvers from './resolvers'
import PassportInitializer from './passport/passport-initializer'
import { AuthService } from './passport/auth.service'

// Create express instance
const app = express()

// Import API Routes
app.use(users)
app.use(test)

const passportInitializer = new PassportInitializer(
  new AuthService(new PrismaClient())
)
passportInitializer.initialize()
passportInitializer.install(app)

const typeDefs = loadSchemaSync('./api/**/*.graphql', {
  loaders: [new GraphQLFileLoader()],
})
const server = new ApolloServer({
  schema: addResolversToSchema(typeDefs, resolvers),
  context: buildContext,
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
