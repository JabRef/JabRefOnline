import type { User } from '@prisma/client'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars -- https://github.com/lucia-auth/lucia/issues/1074
  namespace Lucia {
    type DatabaseUserAttributes = User
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DatabaseSessionAttributes {}
    interface Auth {
      getUserAttributes: (user: DatabaseUserAttributes) => User
      getSessionAttributes: () => {}
    }
  }
}
