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

export interface FieldError {
  field: string
  message: string
}

export interface AuthenticateResponse {
  user?: User
  errors?: [FieldError]
}

@injectable()
export class AuthService {
  constructor(private prisma: PrismaClient) {}
  async validateUser(
    email: string,
    password: string
  ): Promise<AuthenticateResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      return {
        errors: [
          {
            field: 'email',
            message: `User with email '${email}' doesn't exists.`,
          },
        ],
      }
    }
    const correctPassword = await bcrypt.compare(password, user.password)
    if (!correctPassword) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Wrong password',
          },
        ],
      }
    }
    return { user }
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

  async createAccount(
    email: string,
    password: string
  ): Promise<AuthenticateResponse> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email,
      },
    })
    const userWithEmailAlreadyExists = existingUser !== null
    if (userWithEmailAlreadyExists) {
      return {
        errors: [
          {
            field: 'email',
            message: `User with email '${email}' already exists.`,
          },
        ],
      }
    }
    // Hash password before saving in database
    // We use salted hashing to prevent rainbow table attacks
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })
    return { user }
  }

  async updatePassword(
    id: string,
    password: string
  ): Promise<AuthenticateResponse> {
    const getUser = await this.getUserById(id)
    if (!getUser) {
      return {
        errors: [
          {
            field: 'token',
            message: 'user no longer exist',
          },
        ],
      }
    }
    // Hash password before saving in database
    // We use salted hashing to prevent rainbow table attacks
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
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
