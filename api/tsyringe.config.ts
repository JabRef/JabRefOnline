import prisma from '@prisma/client'
import { container, instanceCachingFactory } from 'tsyringe'
import { InjectionSymbols } from './tsyringe'
import PassportInitializer from './user/passport-initializer'
import { createRedisClient } from './utils/services.factory'

const { PrismaClient } = prisma

export async function configure(): Promise<void> {
  container.register(InjectionSymbols.PrismaClient.sym, {
    useFactory: instanceCachingFactory(() => new PrismaClient()),
  })

  container.register(InjectionSymbols.RedisClient.sym, {
    useValue: await createRedisClient(),
  })

  container.register(InjectionSymbols.PassportInitializer.sym, {
    useClass: PassportInitializer,
  })
}
