import { promisify } from 'util'
import { PrismaClient, User } from '@prisma/client'
import { injectable } from 'tsyringe'
import { v4 as generateToken } from 'uuid'
import { RedisClient } from 'redis'
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
  constructor(private prisma: PrismaClient, private redisClient: RedisClient) {}

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
    const token = generateToken()
    const hashedToken = await hash(token)
    this.redisClient.set(key, hashedToken, 'ex', 1000 * 60 * 60 * 24) // VALID FOR ONE DAY
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
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const getAsync = promisify(this.redisClient.get).bind(this.redisClient)
    const hashedToken = await getAsync(key)
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

    this.redisClient.del(key)
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
