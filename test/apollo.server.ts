import { ApolloServer } from 'apollo-server-express'
import { loadSchema } from '~/server/schema'
import { resolve } from '~/server/tsyringe'

export function createAuthenticatedClient(): ApolloServer {
  return new ApolloServer({
    schema: loadSchema(),
    context: () => ({
      getUser: () =>
        resolve('AuthService').getUserById('ckn4oul7100004cv7y3t94n8j'),
    }),
  })
}
