import type { User } from '@prisma/client'
import type { Lucia } from 'lucia'

declare module 'lucia' {
  interface Register {
    Lucia: Lucia<{}, User>
    DatabaseUserAttributes: User
  }
}
