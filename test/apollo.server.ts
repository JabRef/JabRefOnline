import { ApolloServer } from 'apollo-server-express'
import { resolve } from './../api/tsyringe'
import { loadSchema } from '~/api/schema'

export function createAuthenticatedClient(): ApolloServer {
  return new ApolloServer({
    schema: loadSchema(),
    context: () => ({
      getUser: () =>
        resolve('AuthService').getUserById('ckn4oul7100004cv7y3t94n8j'),
    }),
  })
}
