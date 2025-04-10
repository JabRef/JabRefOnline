import prisma from '@prisma/client'
import type { Config } from '~/config'
import * as DocumentResolvers from './documents/resolvers'
import { UserDocumentService } from './documents/user.document.service'
import * as GroupResolvers from './groups/resolvers'
import { GroupService } from './groups/service'
import { JournalService } from './journals/journal.service'
import * as JournalResolvers from './journals/resolvers'
import { instanceCachingFactory, register } from './tsyringe'
import { AuthService } from './user/auth.service'
import * as UserResolvers from './user/resolvers'
import { createEmailService } from './utils/email.service'
import { createRedisClient } from './utils/services.factory'

const { PrismaClient } = prisma

export function configure() {
  const config = useRuntimeConfig() as Config
  register('Config', {
    useValue: config,
  })
  // Tools
  register('PrismaClient', {
    useFactory: instanceCachingFactory(() => new PrismaClient()),
  })
  register('RedisClient', {
    useValue: createRedisClient(config),
  })
  register('EmailService', { useValue: createEmailService() })
  registerClasses()
}

export function registerClasses(): void {
  // Services
  register('UserDocumentService', UserDocumentService)
  register('AuthService', AuthService)
  register('GroupService', GroupService)
  register('JournalService', JournalService)
  // Resolvers
  register('DocumentQuery', DocumentResolvers.Query)
  register('DocumentMutation', DocumentResolvers.Mutation)
  register('DocumentResolver', DocumentResolvers.DocumentResolver)
  register('JournalArticleResolver', DocumentResolvers.JournalArticleResolver)
  register(
    'ProceedingsArticleResolver',
    DocumentResolvers.ProceedingsArticleResolver,
  )
  register('ThesisResolver', DocumentResolvers.ThesisResolver)
  register('OtherResolver', DocumentResolvers.OtherResolver)

  register('GroupQuery', GroupResolvers.Query)
  register('GroupMutation', GroupResolvers.Mutation)
  register('GroupResolver', GroupResolvers.GroupResolver)

  register('JournalQuery', JournalResolvers.Query)
  register('JournalResolver', JournalResolvers.JournalResolver)

  register('UserQuery', UserResolvers.Query)
  register('UserMutation', UserResolvers.Mutation)
  register('UserResolver', UserResolvers.UserResolver)
  register('LoginPayloadResolver', UserResolvers.LoginPayloadResolver)
  register('SignupPayloadResolver', UserResolvers.SignupPayloadResolver)
  register(
    'ChangePasswordPayloadResolver',
    UserResolvers.ChangePasswordPayloadResolver,
  )
}
