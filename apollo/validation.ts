import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(8, { message: 'The password must be at least 8 characters long' })

export const SignupInputSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
})

export const LoginInputSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
})
