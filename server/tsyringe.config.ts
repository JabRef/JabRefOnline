import prisma from '@prisma/client'
import * as DocumentResolvers from './documents/resolvers'
import { UserDocumentService } from './documents/user.document.service'
import * as GroupResolvers from './groups/resolvers'
import { GroupService } from './groups/service'
import { instanceCachingFactory, register } from './tsyringe'
import { AuthService } from './user/auth.service'
import PassportInitializer from './user/passport-initializer'
import * as UserResolvers from './user/resolvers'
import { createRedisClient } from './utils/services.factory'

const { PrismaClient } = prisma

export async function configure(): Promise<void> {
  // Tools
  register('PrismaClient', {
    useFactory: instanceCachingFactory(() => new PrismaClient()),
  })
  register('RedisClient', {
    useValue: await createRedisClient(),
  })
  registerClasses()
}

export function registerClasses(): void {
  // Tools
  register('PassportInitializer', PassportInitializer)

  // Services
  register('UserDocumentService', UserDocumentService)
  register('AuthService', AuthService)
  register('GroupService', GroupService)
  // Resolvers
  register('DocumentQuery', DocumentResolvers.Query)
  register('DocumentMutation', DocumentResolvers.Mutation)
  register('DocumentResolver', DocumentResolvers.DocumentResolver)
  register('JournalArticleResolver', DocumentResolvers.JournalArticleResolver)
  register(
    'ProceedingsArticleResolver',
    DocumentResolvers.ProceedingsArticleResolver
  )
  register('ThesisResolver', DocumentResolvers.ThesisResolver)
  register('OtherResolver', DocumentResolvers.OtherResolver)

  register('GroupQuery', GroupResolvers.Query)
  register('GroupMutation', GroupResolvers.Mutation)
  register('GroupResolver', GroupResolvers.GroupResolver)

  register('UserQuery', UserResolvers.Query)
  register('UserMutation', UserResolvers.Mutation)
  register('UserResolver', UserResolvers.UserResolver)
  register('LoginPayloadResolver', UserResolvers.LoginPayloadResolver)
  register('SignupPayloadResolver', UserResolvers.SignupPayloadResolver)
  register(
    'ChangePasswordPayloadResolver',
    UserResolvers.ChangePasswordPayloadResolver
  )
}
