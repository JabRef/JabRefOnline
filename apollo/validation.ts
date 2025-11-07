import { z } from 'zod'
import {
  LoginInputSchema as InternalLoginInputSchema,
  SignupInputSchema as InternalSignupInputSchema,
} from './validation.internal'

const passwordSchema = z
  .string()
  .min(8, { message: 'The password must be at least 8 characters long' })

export const SignupInputSchema = InternalSignupInputSchema.extend({
  email: z.email(),
  password: passwordSchema,
})

export const LoginInputSchema = InternalLoginInputSchema.extend({
  email: z.email(),
  password: passwordSchema,
})
