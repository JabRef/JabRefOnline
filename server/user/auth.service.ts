import type { PrismaClient, User } from '@prisma/client'

import { v4 as generateToken } from 'uuid'
import { ResolversTypes } from '../graphql'
import { hash, verifyHash } from '../utils/crypto'
import { resetPasswordTemplate } from '../utils/resetPasswordTemplate'
import { sendEmail } from '../utils/sendEmail'
import { RedisClient } from '../utils/services.factory'
import { inject, injectable } from './../tsyringe'

export type { InfoArgument as AuthenticationMessage } from 'graphql-passport'

export interface AuthenticateReturn {
  user?: User
  message?: string
}

export type ChangePasswordPayload = ResolversTypes['ChangePasswordPayload']
export type SignupPayload = ResolversTypes['SignupPayload']
export type LogoutPayload = ResolversTypes['LogoutPayload']
export type ForgotPasswordPayload = ResolversTypes['ForgotPasswordPayload']
export type LoginPayload = ResolversTypes['LoginPayload']

@injectable()
export class AuthService {
  constructor(
    @inject('PrismaClient') private prisma: PrismaClient,
    @inject('RedisClient') private redisClient: RedisClient
  ) {}

  async validateUser(email: string, password: string): Promise<LoginPayload> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      return {
        problems: [
          { path: ['email', 'password'], message: 'Wrong email or password' },
        ],
      }
    } else {
      const correctPassword = await verifyHash(password, user.password)
      if (correctPassword) {
        return { user }
      } else {
        return {
          problems: [
            { path: ['email', 'password'], message: 'Wrong email or password' },
          ],
        }
      }
    }
  }

  async resetPassword(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email)
    if (!user) {
      return true
    }
    const PREFIX = process.env.PREFIX || 'forgot-password'
    const key = PREFIX + user.id
    const token = generateToken()
    const hashedToken = await hash(token)
    await this.redisClient.set(key, hashedToken, { EX: 1000 * 60 * 60 * 24 }) // VALID FOR ONE DAY
    await sendEmail(email, resetPasswordTemplate(user.id, token))
    return true
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    })
  }

  async createAccount(email: string, password: string): Promise<SignupPayload> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email,
      },
    })
    const userWithEmailAlreadyExists = existingUser !== null
    if (userWithEmailAlreadyExists) {
      return {
        problems: [
          {
            path: ['email'],
            message: `User with email '${email}' already exists.`,
          },
        ],
      }
    }
    const hashedPassword = await hash(password)

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })
    return { user }
  }

  async updatePassword(
    token: string,
    id: string,
    newPassword: string
  ): Promise<ChangePasswordPayload> {
    if (newPassword.length < 6) {
      return {
        problems: [
          {
            path: ['password'],
            message: 'Use 6 characters or more for your password',
          },
        ],
      }
    }
    const PREFIX = process.env.PREFIX || 'forgot-password'
    const key = PREFIX + id
    const hashedToken = await this.redisClient.get(key)
    if (!hashedToken) {
      return {
        message: 'Token Expired',
      }
    }
    const checkToken = await verifyHash(token, hashedToken)
    if (!checkToken) {
      return {
        message: 'Invalid Token',
      }
    }

    await this.redisClient.del(key)
    const hashedPassword = await hash(newPassword)
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    })
    return { user }
  }
}
