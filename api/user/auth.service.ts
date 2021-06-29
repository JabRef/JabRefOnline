import { promisify } from 'util'
import { PrismaClient, User } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import { injectable } from 'tsyringe'
import { v4 as generateToken } from 'uuid'
import { RedisClient } from 'redis'
import { sendEmail } from '../utils/sendEmail'
import { resetPasswordTemplate } from '../utils/resetPasswordTemplate'

export interface AuthenticationMessage {
  message?: string
}

export interface AuthenticateReturn {
  user?: User
  message?: string
}

export type Success = {
  user: User
}

export type InputError = {
  field: string
  message: string
}
export type Problem = {
  inputError: InputError
}

export type UserResponse = Success | Problem

@injectable()
export class AuthService {
  constructor(private prisma: PrismaClient, private redisClient: RedisClient) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      throw new Error('Wrong email or password')
    } else {
      const correctPassword = await bcrypt.compare(password, user.password)
      if (correctPassword) {
        return user
      } else {
        throw new Error('Wrong email or password')
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
    const hashedToken = await this.hashString(token)
    this.redisClient.set(key, hashedToken, 'ex', 1000 * 60 * 60 * 24) // VALID FOR ONE DAY
    await sendEmail(email, resetPasswordTemplate(user.id, token))
    return true
  }

  async hashString(password: string): Promise<string> {
    // Hash password before saving in database
    // We use salted hashing to prevent rainbow table attacks
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
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

  async createAccount(
    email: string,
    password: string
  ): Promise<Success | Problem> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email,
      },
    })
    const userWithEmailAlreadyExists = existingUser !== null
    if (userWithEmailAlreadyExists) {
      return {
        inputError: {
          field: 'Email',
          message: `User with email '${email}' already exists.`,
        },
      }
    }
    if (password.length < 6) {
      return {
        inputError: {
          field: 'Password',
          message: 'Use 6 characters or more for your password',
        },
      }
    }
    const hashedPassword = await this.hashString(password)

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
  ): Promise<Success | Problem> {
    if (newPassword.length < 6) {
      return {
        inputError: {
          field: 'Password',
          message: 'Use 6 characters or more for your password',
        },
      }
    }
    const PREFIX = process.env.PREFIX || 'forgot-password'
    const key = PREFIX + id
    const getAsync = promisify(this.redisClient.get).bind(this.redisClient)
    const hashedToken = await getAsync(key)
    if (!hashedToken) {
      return {
        inputError: {
          field: 'Token',
          message: 'Token Expired',
        },
      }
    }
    const checkToken = await bcrypt.compare(token, hashedToken)
    if (!checkToken) {
      return {
        inputError: {
          field: 'Token',
          message: 'Token Expired',
        },
      }
    }

    this.redisClient.del(key)
    const hashedPassword = await this.hashString(newPassword)
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
