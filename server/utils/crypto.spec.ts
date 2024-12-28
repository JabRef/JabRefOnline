import { describe, expect, it } from 'vitest'
import { hash, verifyHash } from './crypto'

describe('hash', () => {
  it('should return the correct hash', async () => {
    expect(await hash('EBNPXY35TYkYXHs')).toMatch(
      '$argon2id$v=19$m=65536,t=3,p=4$',
    )
  })
})

describe('verify hash', () => {
  it('returns true for same password', async () => {
    const password = 'password'
    const hashedPassword = await hash(password)
    expect(await verifyHash(password, hashedPassword)).toBe(true)
  })

  it('returns false for different password', async () => {
    const hashedPassword = await hash('password')
    expect(await verifyHash('different', hashedPassword)).toBe(false)
  })

  it('returns true for the password of alice', async () => {
    expect(
      await verifyHash(
        'EBNPXY35TYkYXHs',
        '$argon2id$v=19$m=65536,t=3,p=4$JpPQhFOXODmSV6mebUqD1g$B2JyogUsj80kxjqiKPlFIiXF72v7SxqWdcw0C10ByhQ',
      ),
    ).toBe(true)
  })
})
