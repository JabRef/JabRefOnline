import { container } from 'tsyringe'
import type { PrismaClient } from '@prisma/client'

export async function disconnect(): Promise<void> {
  await container.resolve<PrismaClient>('PrismaClient').$disconnect()
}
