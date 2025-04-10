import crypto from 'crypto'

import { Hash } from '@adonisjs/hash'
import { Argon } from '@adonisjs/hash/drivers/argon'

// This is mostly taken from nuxt-auth-utils, but with a few changes to make it work it work with argon2 and to fix a few shortcomings
let _hash: Hash | null = null
function getHash() {
  _hash ??= new Hash(new Argon({}))
  return _hash
}
export async function hashPassword(password: string) {
  return await getHash().make(password)
}
export async function verifyPassword(
  hashedPassword: string,
  plainPassword: string,
) {
  return await getHash().verify(hashedPassword, plainPassword)
}

/**
 * Hash the given string.
 *
 * @param token the token to hash
 * @returns the hash
 */
export async function hash(token: string): Promise<string> {
  return await hashPassword(token)
}

export function unsecureHash(token: string | object): string {
  token = typeof token === 'string' ? token : JSON.stringify(token)
  return crypto.createHash('md5').update(token).digest('hex')
}

export async function verifyHash(
  token: string,
  hashedToken: string,
): Promise<boolean> {
  return await verifyPassword(hashedToken, token)
}
