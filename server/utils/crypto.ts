import crypto from 'crypto'

const lengthSaltBytes = 16
const lengthSaltString = lengthSaltBytes * 2 // lengthSaltBytes is in bytes, but salt is encoded in hex, so times 2

/**
 * Hash the given string.
 * We use salted hashing to prevent rainbow table attacks.
 * @param token the token to hash
 * @returns the salted hash
 */
export async function hash(token: string, salt?: string): Promise<string> {
  if (salt && salt.length !== lengthSaltString) {
    throw new Error(
      `Invalid salt length: ${salt.length} but needs to be ${lengthSaltString}`
    )
  }

  const usedSalt = salt ?? crypto.randomBytes(lengthSaltString).toString('hex')
  return new Promise((resolve, reject) => {
    crypto.scrypt(token, usedSalt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(`${usedSalt}${derivedKey.toString('hex')}`)
    })
  })
}

export function unsecureHash(token: string | object): string {
  token = typeof token === 'string' ? token : JSON.stringify(token)
  return crypto.createHash('md5').update(token).digest('hex')
}

export async function verifyHash(
  token: string,
  hashedToken: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const salt = hashedToken.substring(0, 2 * lengthSaltString)
    const hashedTokenWithoutSalt = hashedToken.substring(2 * lengthSaltString)
    crypto.scrypt(token, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(derivedKey.toString('hex') === hashedTokenWithoutSalt)
    })
  })
}
