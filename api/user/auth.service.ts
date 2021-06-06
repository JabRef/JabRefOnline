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

@injectable()
export class AuthService {
  constructor(private prisma: PrismaClient, private redisClient: RedisClient) {}

  closeRedisInstance(): void {
    this.redisClient.quit()
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    } else {
      const correctPassword = await bcrypt.compare(password, user.password)
      if (correctPassword) {
        return user
      } else {
        return null
      }
    }
  }

  async resetPassword(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email)
    if (!user) {
      return true
    }
    const token = generateToken()
    const hashedToken = await this.hashString(token)
    this.redisClient.set(
      `forgot-password-${email}`,
      hashedToken,
      'ex',
      1000 * 60 * 60 * 24
    ) // VALID FOR ONE DAY
    await sendEmail(email, resetPasswordTemplate(email, token))
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

  async createAccount(email: string, password: string): Promise<User> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email,
      },
    })
    const userWithEmailAlreadyExists = existingUser !== null
    if (userWithEmailAlreadyExists) {
      throw new Error(`User with email '${email}' already exists.`)
    }
    const hashedPassword = await this.hashString(password)

    return await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })
  }

  async updatePassword(
    token: string,
    email: string,
    newPassword: string
  ): Promise<User | null> {
    if (newPassword.length <= 6) {
      return null
    }
    const getUser = await this.getUserByEmail(email)
    if (!getUser) {
      return null
    }
    const key = `forgot-password-${email}`
    const getAsync = promisify(this.redisClient.get).bind(this.redisClient)
    const hashedToken = await getAsync(key)
    if (!hashedToken) {
      return null
    }
    const tokenCheck = await bcrypt.compare(token, hashedToken)
    if (tokenCheck) {
      this.redisClient.del(key)
      const hashedPassword = await this.hashString(newPassword)
      return await this.prisma.user.update({
        where: {
          email,
        },
        data: {
          password: hashedPassword,
        },
      })
    }
    return null
  }
}
