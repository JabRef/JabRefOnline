import { z } from 'zod'
import { LoginInput, SignupInput } from './graphql'
import {
  LoginInputSchema as InternalLoginInputSchema,
  SignupInputSchema as InternalSignupInputSchema,
} from './validation.internal'

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>
}>

const passwordSchema = z
  .string()
  .min(8, { message: 'The password must be at least 8 characters long' })

export function SignupInputSchema(): z.ZodObject<Properties<SignupInput>> {
  return InternalSignupInputSchema().extend({
    email: z.string().email(),
    password: passwordSchema,
  })
}

export function LoginInputSchema(): z.ZodObject<Properties<LoginInput>> {
  return InternalLoginInputSchema().extend({
    email: z.string().email(),
    password: passwordSchema,
  })
}
