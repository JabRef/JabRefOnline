import { z } from 'zod'
import { SignupInput } from './graphql'
import { SignupInputSchema as InternalSignupInputSchema } from './validation.internal'

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>
}>

export function SignupInputSchema(): z.ZodObject<Properties<SignupInput>> {
  return InternalSignupInputSchema().extend({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'The password must be at least 8 characters long' }),
  })
}
