import { GraphQLLocalStrategy } from 'graphql-passport'
import { Request as ExpressRequest } from 'express'
import { User } from '@prisma/client'
import { AuthService } from './auth.service'

export default class LocalStrategy extends GraphQLLocalStrategy<
  User,
  ExpressRequest
> {
  constructor(private authService: AuthService) {
    super(
      async (
        email: unknown,
        password: unknown,
        done: (
          error?: [{ field: string; message: string }] | null,
          user?: User | null
        ) => void
      ) => {
        try {
          const { user, errors } = await this.authService.validateUser(
            email as string,
            password as string
          )
          if (!user) {
            // Wrong email-password combination
            done(errors)
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
