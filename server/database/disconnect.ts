import { resolve } from './../tsyringe'

export async function disconnect(): Promise<void> {
  await resolve('PrismaClient').$disconnect()
}
