import { ApolloServer } from 'apollo-server-express'
import { loadSchemaFromFilesWithResolvers } from '~/server/schema'
import { resolve } from '~/server/tsyringe'

export async function createAuthenticatedClient(): Promise<ApolloServer> {
  return new ApolloServer({
    schema: await loadSchemaFromFilesWithResolvers(),
    context: () => ({
      getUser: () =>
        resolve('AuthService').getUserById('ckn4oul7100004cv7y3t94n8j'),
    }),
  })
}
