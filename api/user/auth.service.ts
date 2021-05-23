import { promisify } from 'util'
import { PrismaClient, User } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import { injectable } from 'tsyringe'
import { v4 } from 'uuid'
import { RedisClient } from 'redis'
import { sendEmail } from '../utils/sendEmail'

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

  async createAndSendToken(email: string): Promise<boolean> {
    const token = v4()
    this.redisClient.set(
      'forgot-password' + token,
      email,
      'ex',
      1000 * 60 * 60 * 24
    ) // VALID FOR ONE DAY
    // TODO: ADD BETTER TEMPLATE FOR THE EMAIL
    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">Reset password</a>`
    )
    return true
  }

  async hashPassword(password: string): Promise<string> {
    // Hash password before saving in database
    // We use salted hashing to prevent rainbow table attacks
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
  }

  async getUserId(email: string): Promise<string | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    })
    if (user) {
      return user.id
    }
    return null
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
    const hashedPassword = await this.hashPassword(password)

    return await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })
  }

  async updatePassword(
    token: string,
    newPassword: string
  ): Promise<User | null> {
    if (newPassword.length <= 6) {
      return null
    }
    const key = 'forgot-password' + token
    const getAsync = promisify(this.redisClient.get).bind(this.redisClient)
    const email = await getAsync(key)
    if (!email) {
      return null
    }
    const getUser = await this.getUserByEmail(email)
    if (!getUser) {
      return null
    }
    const hashedPassword = await this.hashPassword(newPassword)
    return await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    })
  }
}
