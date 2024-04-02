import type { User } from '@prisma/client'

declare global {
  namespace Lucia {
    type DatabaseUserAttributes = User

    interface DatabaseSessionAttributes {}
    interface Auth {
      getUserAttributes: (user: DatabaseUserAttributes) => User
      getSessionAttributes: () => DatabaseSessionAttributes
    }
  }
}
