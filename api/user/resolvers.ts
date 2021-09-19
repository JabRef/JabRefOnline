import { User } from '@prisma/client'
import { container, injectable } from 'tsyringe'
import { Context } from '../context'
import {
  MutationLoginArgs,
  MutationSignupArgs,
  MutationChangePasswordArgs,
  MutationForgotPasswordArgs,
  QueryUserArgs,
  Resolvers,
  UserDocumentsArgs,
  ForgotPasswordPayload,
  UserDocumentsConnectionArgs,
} from '../graphql'
import { GroupResolved } from '../groups/resolvers'
import {
  PaginationResult,
  UserDocument,
  UserDocumentService,
} from '../documents/user.document.service'
import { GroupService } from '../groups/service'
import {
  AuthService,
  ChangePasswordPayload,
  LoginPayload,
  LogoutPayload,
  SignupPayload,
} from './auth.service'

@injectable()
export class Query {
  constructor(private authService: AuthService) {}

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
  constructor(private authService: AuthService) {}

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
            message: info?.message || 'Unknown error while logging in.',
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
class SignupPayloadResolver {
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
class ChangePasswordPayloadResolver {
  __resolveType(
    changePassword: ChangePasswordPayload
  ): 'UserReturned' | 'TokenProblem' | 'InputValidationProblem' {
    if ('user' in changePassword) return 'UserReturned'
    else if ('problems' in changePassword) return 'InputValidationProblem'
    return 'TokenProblem'
  }
}

@injectable()
class LoginPayloadResolver {
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
    private userDocumentService: UserDocumentService,
    private groupService: GroupService
  ) {}

  async documents(
    user: User,
    { filterBy }: UserDocumentsArgs
  ): Promise<UserDocument[]> {
    return await this.userDocumentService.getDocumentsOf(user, filterBy, true)
  }

  async documentsConnection(
    user: User,
    { first, after }: UserDocumentsConnectionArgs
  ): Promise<PaginationResult> {
    return await this.userDocumentService.getDocumentWithPagination(
      user,
      first,
      after,
      true
    )
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
    Query: container.resolve(Query),
    Mutation: container.resolve(Mutation),
    User: container.resolve(UserResolver),
    LoginPayload: container.resolve(LoginPayloadResolver),
    SignupPayload: container.resolve(SignupPayloadResolver),
    ChangePasswordPayload: container.resolve(ChangePasswordPayloadResolver),
  }
}
