import type { PrismaClient, User } from '@prisma/client'

import type { ResolversTypes } from '#graphql/resolver'
import { LuciaError, lucia as luciaConstructor, type Auth } from 'lucia'
import type { Storage } from 'unstorage'
import { v4 as generateToken } from 'uuid'
import { Environment, type Config } from '~/config'
import { hash, verifyHash } from '../utils/crypto'
import type { EmailService } from '../utils/email.service'
import {
  resetPasswordTemplate,
  resetPasswordUserNotFoundTemplate,
} from '../utils/resetPasswordTemplate'
import { inject, injectable } from './../tsyringe'

import { prisma as prismaAdapter } from '@lucia-auth/adapter-prisma'
import { unstorage as unstorageAdapter } from '@lucia-auth/adapter-session-unstorage'
import { H3Event } from 'h3'
import { h3 } from '../utils/luciaMiddleware'

const EMAIL_PROVIDER = 'email'
const FORGOT_PASSWORD_PREFIX = 'forgot-password'

export type ChangePasswordPayload = ResolversTypes['ChangePasswordPayload']
export type SignupPayload = ResolversTypes['SignupPayload']
export type LogoutPayload = ResolversTypes['LogoutPayload']
export type ForgotPasswordPayload = ResolversTypes['ForgotPasswordPayload']
export type LoginPayload = ResolversTypes['LoginPayload']

@injectable()
export class AuthService {
  lucia: Auth
  constructor(
    @inject('PrismaClient') private prisma: PrismaClient,
    @inject('RedisClient') private redisClient: Storage,
    @inject('EmailService') private emailService: EmailService,
    @inject('Config') private config: Config,
  ) {
    this.lucia = luciaConstructor({
      env:
        config.public.environment === Environment.Production ? 'PROD' : 'DEV',
      middleware: h3(),
      adapter: {
        user: prismaAdapter(prisma),
        session: unstorageAdapter(redisClient),
      },
      getUserAttributes: (user: User) => user,
      sessionExpiresIn: {
        // Session counts as active for 1 day (afterwards it has to be refreshed)
        activePeriod: 1000 * 60 * 60 * 24,
        // Session completely expires after half a year
        idlePeriod: 0.5 * 31556952 * 1000,
      },
      sessionCookie: {
        attributes: {
          // Blocks sending a cookie in a cross-origin request, protects somewhat against CORS attacks
          sameSite: 'strict',
        },
      },
      // TODO: Enable (once figure out why login then no longer works)
      csrfProtection: false,
    })
  }

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany()
  }

  async validateUser(email: string, password: string) {
    try {
      const key = await this.lucia.useKey(
        EMAIL_PROVIDER,
        email.toLowerCase(),
        password,
      )
      const user = await this.getUserById(key.userId)
      if (!user) {
        throw new Error('User not found although key was valid')
      }
      return user
    } catch (error) {
      if (
        error instanceof LuciaError &&
        (error.message === 'AUTH_INVALID_KEY_ID' ||
          error.message === 'AUTH_INVALID_PASSWORD')
      ) {
        return {
          problems: [
            { path: ['email', 'password'], message: 'Wrong email or password' },
          ],
        }
      }
      throw error
    }
  }

  async resetPassword(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email)
    if (!user) {
      await this.emailService.sendEmail(
        { address: email },
        'Password reset on JabRef',
        resetPasswordUserNotFoundTemplate(),
      )
      return true
    }
    const key = FORGOT_PASSWORD_PREFIX + user.id
    const token = generateToken()
    const hashedToken = await hash(token)
    await this.redisClient.setItem(key, hashedToken, {
      EX: 1000 * 60 * 60 * 24, // Valid for 1 day
    })
    await this.emailService.sendEmail(
      { address: email },
      'Password reset on JabRef',
      resetPasswordTemplate(user.id, token),
    )
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
        id: email.toLowerCase(),
      },
    })
  }

  async createAccount(email: string, password: string) {
    try {
      const user = await this.lucia.createUser({
        key: {
          providerId: EMAIL_PROVIDER,
          providerUserId: email.toLowerCase(),
          password,
        },
        // @ts-expect-error: lucia forces us to pass all attributes, but they are actually generated by the database
        attributes: {
          email: email.toLowerCase(),
        },
      })
      return user
    } catch (error) {
      if (
        error instanceof LuciaError &&
        error.message === 'AUTH_DUPLICATE_KEY_ID'
      ) {
        return {
          problems: [
            {
              path: ['email'],
              message: `User with email '${email}' already exists.`,
            },
          ],
        }
      }
      throw error
    }
  }

  async updatePassword(token: string, userId: string, newPassword: string) {
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
    const key = FORGOT_PASSWORD_PREFIX + userId
    const hashedToken = await this.redisClient.getItem<string>(key)
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
    await this.redisClient.removeItem(key)

    const user = await this.getUserById(userId)
    if (!user) {
      return {
        message: 'User not found',
      }
    }
    await this.lucia.invalidateAllUserSessions(user.id)
    await this.lucia.updateKeyPassword(EMAIL_PROVIDER, user.email, newPassword)
    return { user }
  }

  async createSession(user: User | string) {
    const userId = typeof user === 'string' ? user : user.id
    return await this.lucia.createSession({
      userId,
      attributes: {},
    })
  }

  createAuthContext(event: H3Event) {
    return this.lucia.handleRequest(event)
  }
}
