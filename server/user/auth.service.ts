import type { PrismaClient, User } from '@prisma/client'

import type { ResolversTypes } from '#graphql/resolver'
import { Lucia, TimeSpan } from 'lucia'

import type { Storage } from 'unstorage'
import { v4 as generateToken } from 'uuid'
import { type Config } from '~/config'
import { hash, verifyHash } from '../utils/crypto'
import type { EmailService } from '../utils/email.service'
import {
  resetPasswordTemplate,
  resetPasswordUserNotFoundTemplate,
  welcomeTemplate,
} from '../utils/emailTemplates'
import { inject, injectable } from './../tsyringe'

import { UnstorageSessionAdapter, UserAdapter } from './UnstorageSessionAdapter'

const FORGOT_PASSWORD_PREFIX = 'forgot-password'

export type ChangePasswordPayload = ResolversTypes['ChangePasswordPayload']
export type SignupPayload = ResolversTypes['SignupPayload']
export type LogoutPayload = ResolversTypes['LogoutPayload']
export type ForgotPasswordPayload = ResolversTypes['ForgotPasswordPayload']
export type LoginPayload = ResolversTypes['LoginPayload']

@injectable()
export class AuthService {
  lucia: Lucia
  constructor(
    @inject('PrismaClient') private prisma: PrismaClient,
    @inject('RedisClient') private redisClient: Storage,
    @inject('EmailService') private emailService: EmailService,
    @inject('Config') private config: Config,
  ) {
    this.lucia = new Lucia(
      new UnstorageSessionAdapter(redisClient, new UserAdapter(prisma)),
      {
        getUserAttributes: (user: User) => user,
        sessionExpiresIn: new TimeSpan(25, 'w'), // about 6 months
      },
    )
  }

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany()
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user?.password) {
      return {
        problems: [
          { path: ['email', 'password'], message: 'Wrong email or password' },
        ],
      }
    }
    if (await verifyHash(password, user.password)) {
      return user
    } else {
      return {
        problems: [
          { path: ['email', 'password'], message: 'Wrong email or password' },
        ],
      }
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
      ttl: 1000 * 60 * 60 * 24, // Valid for 1 day
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

    await this.emailService.sendEmail(
      { address: email },
      'Welcome! Confirm your email and get started',
      welcomeTemplate(user),
    )

    return { user }
  }

  async updatePassword(
    token: string,
    userId: string,
    newPassword: string,
  ): Promise<ChangePasswordPayload> {
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
    await this.lucia.invalidateUserSessions(user.id)
    const hashedPassword = await hash(newPassword)
    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    })
    return { user: updatedUser }
  }

  async createSession(user: User | string) {
    const userId = typeof user === 'string' ? user : user.id
    return await this.lucia.createSession(userId, {})
  }

  async getSession(id: string) {
    return await this.lucia.validateSession(id)
  }

  async invalidateSession(sessionId: string) {
    await this.lucia.invalidateSession(sessionId)
  }
}
