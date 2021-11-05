import { container } from 'tsyringe'
import prisma from '@prisma/client'
const { PrismaClient } = prisma

export async function disconnect(): Promise<void> {
  await container.resolve(PrismaClient).$disconnect()
}
