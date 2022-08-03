import { hash, verifyHash } from './crypto'

describe('hash', () => {
  it('should return the correct hash', async () => {
    expect(
      await hash('EBNPXY35TYkYXHs', 'saltsaltsaltsaltsaltsaltsaltsalt')
    ).toBe(
      'saltsaltsaltsaltsaltsaltsaltsalt63f7e072b6a9faf6e77616c098c4bb3ac69c58d249e620e1dd51257018ac7fcb40b576e9f69e9c556c70a980327dac12b1ee76a76f22b249d585fe2de10b365a'
    )
  })
})

describe('verifyHash', () => {
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
        '19184d8c1c1e9b483d8347f8da0d53ad92170233100d32c3a0d748725948c28d09a060d7f02962b7b93320c72a2cdd94f21b16b08bf8bd1cba0c5f77afeffddbb24df527c4f16f1fca6eb5480159b56df3d818b4b3c74ead04227a78b3d810b8'
      )
    ).toBe(true)
  })
})
