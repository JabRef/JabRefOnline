import { describe, expect, it } from 'vitest'
import { hash, verifyHash } from './crypto'

describe('hash', () => {
  it('should return the correct hash', async () => {
    expect(await hash('EBNPXY35TYkYXHs')).toContain(
      '$argon2id$v=19$m=19456,t=2,p=1$',
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
        '$argon2id$v=19$m=19456,t=2,p=1$kQn8EJpP0pwpg8ATqu3lbA$0mAARjfiYXNR/GucyzBVKA5p/xv566dqLRF9Pbj4xkw',
      ),
    ).toBe(true)
  })
})
