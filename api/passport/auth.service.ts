import { PrismaClient, User } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import { injectable } from 'tsyringe'

export interface AuthenticationMessage {
  message?: string
}

export interface AuthenticateReturn {
  user?: User
  message?: string
}

@injectable()
export class AuthService {
  constructor(private prisma: PrismaClient) {}

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

  async getUserById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
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

    // Hash password before saving in database
    // We use salted hashing to prevent rainbow table attacks
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    return await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })
  }
}
