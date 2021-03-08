import { PrismaClient, User } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

export interface AuthenticationMessage {
  message?: string
}

export interface AuthenticateReturn {
  user?: User;
  message?: string
}

export default class AuthService {
  private prisma: PrismaClient
  constructor () {
    this.prisma = new PrismaClient()
  }

  async validateUser (email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
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

  async getUserById (id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }
}
