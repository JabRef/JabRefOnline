import crypto from 'crypto'
import { Argon2id } from 'oslo/password'

// TODO: Use a proper pepper and store it in a secure location
const argon2id = new Argon2id({ secret: Buffer.from('my-secret') })

/**
 * Hash the given string.
 *
 * Argon2Id internally already uses a salt to prevent rainbow table attacks, so we don't need to provide one.
 * @param token the token to hash
 * @returns the hash
 */
export async function hash(token: string): Promise<string> {
  return await argon2id.hash(token)
}

export function unsecureHash(token: string | object): string {
  token = typeof token === 'string' ? token : JSON.stringify(token)
  return crypto.createHash('md5').update(token).digest('hex')
}

export async function verifyHash(
  token: string,
  hashedToken: string,
): Promise<boolean> {
  return await argon2id.verify(hashedToken, token)
}
