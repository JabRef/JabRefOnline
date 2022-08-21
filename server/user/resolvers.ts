import { User } from '@prisma/client'
import { Context } from '../context'
import {
  UserDocumentService,
  UserDocumentsResult,
} from '../documents/user.document.service'
import {
  ForgotPasswordPayload,
  MutationChangePasswordArgs,
  MutationForgotPasswordArgs,
  MutationLoginArgs,
  MutationSignupArgs,
  QueryUserArgs,
  Resolvers,
  UserDocumentsArgs,
} from '../graphql'
import { GroupResolved } from '../groups/resolvers'
import { GroupService } from '../groups/service'
import { inject, injectable, resolve } from './../tsyringe'
import {
  AuthService,
  ChangePasswordPayload,
  LoginPayload,
  LogoutPayload,
  SignupPayload,
} from './auth.service'

@injectable()
export class Query {
  constructor(@inject('AuthService') private authService: AuthService) {}

  async user(
    _root: Record<string, never>,
    { id }: QueryUserArgs,
    _context: Context
  ): Promise<User | null> {
    return await this.authService.getUserById(id)
  }

  me(
    _root: Record<string, never>,
    _args: Record<string, never>,
    context: Context
  ): User | null {
    return context.getUser()
  }
}

@injectable()
export class Mutation {
  constructor(@inject('AuthService') private authService: AuthService) {}

  async signup(
    _root: Record<string, never>,
    { email, password }: MutationSignupArgs,
    context: Context
  ): Promise<SignupPayload> {
    const newUserPayload = await this.authService.createAccount(email, password)
    if ('user' in newUserPayload) void context.login(await newUserPayload.user)
    return newUserPayload
  }

  async login(
    _root: Record<string, never>,
    { email, password }: MutationLoginArgs,
    context: Context
  ): Promise<LoginPayload> {
    const { user, info } = await context.authenticate('graphql-local', {
      email,
      password,
    })
    if (user) {
      // Make login persistent by putting it in the express session store
      await context.login(user)
      return { user }
    } else {
      return {
        problems: [
          {
            path: 'Email or Password',
            message:
              (typeof info === 'string' ? info : info?.message) ||
              'Unknown error while logging in.',
          },
        ],
      }
    }
  }

  logout(
    _root: Record<string, never>,
    _args: Record<string, never>,
    context: Context
  ): LogoutPayload {
    context.logout()
    return {
      result: true,
    }
  }

  async forgotPassword(
    _root: Record<string, never>,
    { email }: MutationForgotPasswordArgs,
    _context: Context
  ): Promise<ForgotPasswordPayload> {
    return {
      result: await this.authService.resetPassword(email),
    }
  }

  async changePassword(
    _root: Record<string, never>,
    { token, id, newPassword }: MutationChangePasswordArgs,
    _context: Context
  ): Promise<ChangePasswordPayload> {
    return await this.authService.updatePassword(token, id, newPassword)
  }
}

@injectable()
export class SignupPayloadResolver {
  __resolveType(
    signup: SignupPayload
  ): 'UserReturned' | 'InputValidationProblem' {
    if ('user' in signup) {
      return 'UserReturned'
    }
    return 'InputValidationProblem'
  }
}

@injectable()
export class ChangePasswordPayloadResolver {
  __resolveType(
    changePassword: ChangePasswordPayload
  ): 'UserReturned' | 'TokenProblem' | 'InputValidationProblem' {
    if ('user' in changePassword) return 'UserReturned'
    else if ('problems' in changePassword) return 'InputValidationProblem'
    return 'TokenProblem'
  }
}

@injectable()
export class LoginPayloadResolver {
  __resolveType(
    login: LoginPayload
  ): 'UserReturned' | 'InputValidationProblem' {
    if ('user' in login) {
      return 'UserReturned'
    }
    return 'InputValidationProblem'
  }
}

@injectable()
export class UserResolver {
  constructor(
    @inject('UserDocumentService')
    private userDocumentService: UserDocumentService,
    @inject('GroupService') private groupService: GroupService
  ) {}

  async documents(
    user: User,
    { filterBy, first, after }: UserDocumentsArgs
  ): Promise<UserDocumentsResult> {
    const { documents, hasNextPage } =
      await this.userDocumentService.getDocumentsOf(
        user,
        filterBy,
        first,
        after,
        true
      )

    const endCursor = documents.length
      ? documents[documents.length - 1].id
      : null

    return {
      edges: documents.map((document) => ({ node: document })),
      pageInfo: {
        endCursor,
        hasNextPage,
      },
    }
  }

  async groups(user: User): Promise<GroupResolved[]> {
    const groups = await this.groupService.getGroupsOf(user)
    const groupsById = new Map<string, GroupResolved>()
    groups.forEach((group) =>
      groupsById.set(group.id, { ...group, parent: null, children: [] })
    )
    const roots: GroupResolved[] = []

    groupsById.forEach((group) => {
      if (group.parentId === null) {
        roots.push(group)
      } else {
        const parent = groupsById.get(group.parentId)
        parent?.children.push(group)
        group.parent = parent ?? null
      }
    })
    return roots
  }
}

export function resolvers(): Resolvers {
  return {
    Query: resolve('UserQuery'),
    Mutation: resolve('UserMutation'),
    User: resolve('UserResolver'),
    LoginPayload: resolve('LoginPayloadResolver'),
    SignupPayload: resolve('SignupPayloadResolver'),
    ChangePasswordPayload: resolve('ChangePasswordPayloadResolver'),
  }
}
