import { GraphQLLocalStrategy } from 'graphql-passport'
import { Request as ExpressRequest } from 'express'
import { User } from '@prisma/client'
import { AuthService, AuthenticationMessage } from './auth.service'

export default class EmailStrategy extends GraphQLLocalStrategy<
  User,
  ExpressRequest
> {
  constructor(private authService: AuthService) {
    super(
      async (
        email: unknown,
        password: unknown,
        done: (
          error: Error | null,
          user?: User | null,
          message?: AuthenticationMessage
        ) => void
      ) => {
        try {
          const user = await this.authService.validateUser(
            email as string,
            password as string
          )
          if (!user) {
            // Wrong email-password combination
            done(null, null, { message: 'Wrong email or password.' })
          } else {
            // Authentication succeeded
            done(null, user)
          }
        } catch (err) {
          done(err)
        }
      }
    )
  }
}
