import type { ServerSessionData, UserSession } from '#auth-utils'
import type { ResolversTypes } from '#graphql/resolver'
import { prefixStorage, type Storage } from 'unstorage'
import { v4 as generateToken } from 'uuid'
import type { PrismaClient, User } from '../database'
import { hash, verifyHash } from '../utils/crypto'
import type { EmailService } from '../utils/email.service'
import {
  resetPasswordTemplate,
  resetPasswordUserNotFoundTemplate,
  welcomeTemplate,
} from '../utils/emailTemplates'
import { inject, injectable } from './../tsyringe'

const FORGOT_PASSWORD_PREFIX = 'forgot-password'

export type ChangePasswordPayload = ResolversTypes['ChangePasswordPayload']
export type SignupPayload = ResolversTypes['SignupPayload']
export type LogoutPayload = ResolversTypes['LogoutPayload']
export type ForgotPasswordPayload = ResolversTypes['ForgotPasswordPayload']
export type LoginPayload = ResolversTypes['LoginPayload']

const invalidCredentialsError = {
  problems: [
    { path: ['email', 'password'], message: 'Wrong email or password' },
  ],
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- unstorage doesn't seem to work interface
type SessionStorage = {
  items: Record<string, ServerSessionData>
}

@injectable()
export class AuthService {
  /**
   * Storage for all sessions associated with a user. Base is the user ID, keys are session IDs.
   */
  sessionStorage: Storage<SessionStorage>

  constructor(
    @inject('PrismaClient') private prisma: PrismaClient,
    @inject('RedisClient') private redisClient: Storage<string>,
    @inject('EmailService') private emailService: EmailService,
  ) {
    this.sessionStorage = prefixStorage<SessionStorage>(
      redisClient as any,
      'session',
    )
  }

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany()
  }

  async validateUser(email: string, password: string) {
    const user = await this.getUserByEmail(email)
    if (!user) {
      return invalidCredentialsError
    }
    if (!(await verifyHash(password, user.hashedPassword))) {
      return invalidCredentialsError
    }

    return user
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
        email: email.toLowerCase(),
      },
    })
  }

  async createAccount(email: string, password: string) {
    if (await this.getUserByEmail(email)) {
      return {
        problems: [
          {
            path: ['email'],
            message: `User with email '${email}' already exists.`,
          },
        ],
      }
    }

    const user = await this.prisma.user.create({
      data: {
        email: email.toLowerCase(),
        hashedPassword: await hash(password),
      },
    })

    await this.emailService.sendEmail(
      { address: email },
      'Welcome! Confirm your email and get started',
      welcomeTemplate(user),
    )

    return user
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
    const hashedToken = await this.redisClient.getItem(key)
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
    await this._invalidateAllUserSessions(user.id)
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        hashedPassword: await hash(newPassword),
      },
    })
    return { user }
  }

  /**
   * Refreshes a session in the session storage.
   * If the session is no longer valid, an error is thrown.
   *
   * @returns Server session data
   */
  async refreshSession({
    id,
    data,
  }: {
    id?: string
    data: UserSession
  }): Promise<ServerSessionData> {
    if (!id || !data.user?.id) {
      throw new Error('Invalid session')
    }

    const info = await this.sessionStorage.getItem(`${data.user.id}:${id}`)
    if (!info) {
      throw new Error('Session not found')
    } else {
      info.lastActive = new Date()
      await this._setSession(data.user.id, id, info)
      return info
    }
  }

  _invalidateAllUserSessions(userId: string) {
    return this.sessionStorage.clear(userId)
  }

  _setSession(userId: string, sessionId: string, data: ServerSessionData) {
    return this.sessionStorage.setItem(`${userId}:${sessionId}`, data, {
      ttl: 1000 * 60 * 60 * 24 * 7, // 1 week
    })
  }

  async initSession(
    sessionId: string,
    user: User | string,
  ): Promise<Omit<UserSession, 'id'>> {
    const userId = typeof user === 'string' ? user : user.id
    const serverData = {
      lastActive: new Date(),
    }
    await this._setSession(userId, sessionId, serverData)
    return {
      user: {
        id: userId,
      },
      server: serverData,
    }
  }
}
