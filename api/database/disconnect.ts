import { container } from 'tsyringe'
import { PrismaClient } from '@prisma/client'

export async function disconnect(): Promise<void> {
  await container.resolve(PrismaClient).$disconnect()
}
