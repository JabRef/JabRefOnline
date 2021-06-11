import { ApolloServer } from 'apollo-server-express'
import { container } from 'tsyringe'
import { AuthService } from '../api/user/auth.service'
import { loadSchema } from '~/api/schema'

export function createAuthenticatedClient(): ApolloServer {
  return new ApolloServer({
    schema: loadSchema(),
    context: () => ({
      getUser: () =>
        container.resolve(AuthService).getUserById('ckn4oul7100004cv7y3t94n8j'),
    }),
  })
}
