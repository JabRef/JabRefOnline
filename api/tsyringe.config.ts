import 'reflect-metadata'
import { PrismaClient } from '@prisma/client'

import { container, instanceCachingFactory } from 'tsyringe'

container.register<PrismaClient>(PrismaClient, {
  useFactory: instanceCachingFactory<PrismaClient>(() => new PrismaClient()),
})
