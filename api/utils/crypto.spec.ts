import { hash, verifyHash } from './crypto'

describe('hash', () => {
  it('should return the correct hash', async () => {
    expect(await hash('EBNPXY35TYkYXHs', 'saltsaltsaltsaltsaltsaltsaltsalt')).toBe('saltsaltsaltsaltsaltsaltsaltsalt63f7e072b6a9faf6e77616c098c4bb3ac69c58d249e620e1dd51257018ac7fcb40b576e9f69e9c556c70a980327dac12b1ee76a76f22b249d585fe2de10b365a')
  })
}

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
})
