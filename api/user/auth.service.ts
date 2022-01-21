import type { PrismaClient, User } from '@prisma/client'
import { inject, injectable } from 'tsyringe'
import uuid from 'uuid' // TODO: Change to { v4 as generateToken } as soon as uuid is a proper esm module / jest supports it (https://github.com/uuidjs/uuid/issues/451)
import { RedisClientType } from 'redis'
import { hash, verifyHash } from '../utils/crypto'
import { sendEmail } from '../utils/sendEmail'
import { resetPasswordTemplate } from '../utils/resetPasswordTemplate'
import { ResolversTypes } from '../graphql'

export { InfoArgument as AuthenticationMessage } from 'graphql-passport'

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
    @inject('RedisClient') private redisClient: RedisClientType<any, any>
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
          { path: 'Email or Password', message: 'Wrong email or password' },
        ],
      }
    } else {
      const correctPassword = await verifyHash(password, user.password)
      if (correctPassword) {
        return { user }
      } else {
        return {
          problems: [
            { path: 'Email or Password', message: 'Wrong email or password' },
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
    const token = uuid.v4()
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
            path: 'Email',
            message: `User with email '${email}' already exists.`,
          },
        ],
      }
    }
    if (password.length < 6) {
      return {
        problems: [
          {
            path: 'Password',
            message: 'Use 6 characters or more for your password',
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
            path: 'Password',
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
