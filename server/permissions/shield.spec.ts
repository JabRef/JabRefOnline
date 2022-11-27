import { GraphQLResolveInfo } from 'graphql'
import { Context } from '../context'
import { shield } from './shield'

// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
class TypeTest {
  @shield({
    after: () => true,
  })
  noArgsAfterRule(
    _root: Record<string, never>,
    _args: { id: string },
    _context: Context,
    _info: GraphQLResolveInfo
  ): boolean {
    return true
  }

  @shield({
    after: (
      _result: boolean,
      _root: Record<string, never>,
      _args: { id: string },
      _context: Context,
      _info: GraphQLResolveInfo
    ) => true,
  })
  afterRuleWithSameTypeAsResolver(
    _root: Record<string, never>,
    _args: { id: string },
    _context: Context,
    _info: GraphQLResolveInfo
  ): boolean {
    return true
  }

  @shield({
    after: (
      _result: boolean,
      _root: Record<string, never>,
      _args: { id: string },
      _context: Context,
      _info: GraphQLResolveInfo
    ) => true,
  })
  afterRuleAcceptingWiderTypeAsArg(
    _root: Record<string, never>,
    _args: { id: string; other: string },
    _context: Context,
    _info: GraphQLResolveInfo
  ): boolean {
    return true
  }

  // @ts-expect-error: rule cannot accept more specialized type than resolver
  @shield({
    after: (
      _result: { id: string },
      _root: Record<string, never>,
      _args: { id: string; other: string },
      _context: Context,
      _info: GraphQLResolveInfo
    ) => true,
  })
  afterRuleAcceptingInvalidTypeAsArg(
    _root: Record<string, never>,
    _args: { id: string },
    _context: Context,
    _info: GraphQLResolveInfo
  ): boolean {
    return true
  }
}

class TestResolver {
  @shield({
    after: (result) => result === 'verified',
  })
  verify(_root: Record<string, never>, { status }: { status: string }) {
    return status
  }
}

describe('after rule', () => {
  it('do not modify resolver result if rule returns true', () => {
    const resolver = new TestResolver()
    const result = resolver.verify({} as never, { status: 'verified' })
    expect(result).toEqual('verified')
  })
  it('throw error if rule returns false', () => {
    const resolver = new TestResolver()
    expect(
      resolver.verify({} as never, { status: 'not verified' })
    ).toThrowError()
  })
})
