import { GraphQLResolveInfo } from 'graphql'
import { IRuleResult, ShieldRule } from 'graphql-shield/typings/types'

import { deny } from 'graphql-shield'
import { Context } from '../context'

class TestShield {
  @shield<boolean, Record<string, never>, Context, { id: string }>({
    before: deny,
    after: () => true,
  })
  resolverComplete(
    _root: Record<string, never>,
    _args: { id: string },
    _context: Context,
    _info: GraphQLResolveInfo
  ): boolean {
    return true
  }

  @shield({
    before: deny,
    after: (result, parent, args, context, info) => true,
  })
  resolverComplete3(
    _root: Record<string, never>,
    _args: { id: string },
    _context: Context,
    _info: GraphQLResolveInfo
  ): boolean {
    return true
  }

  @shield({
    before: deny,
    after: (
      _result: boolean,
      _root: Record<string, never>,
      _args: { id: string },
      _context: Context,
      _info: GraphQLResolveInfo
    ) => true,
  })
  resolverComplete2(
    _root: Record<string, never>,
    _args: { id: string; other: string },
    _context: Context,
    _info: GraphQLResolveInfo
  ): boolean {
    return true
  }

  @shield({
    before: deny,
    after: (
      _result: { id: string },
      _root: Record<string, never>,
      _args: { id: string },
      _context: Context,
      _info: GraphQLResolveInfo
    ) => true,
  })
  resolverCompleteReturn(
    _root: Record<string, never>,
    _args: { id: string; other: string },
    _context: Context,
    _info: GraphQLResolveInfo
  ): Promise<{ id: string; context: string }> {
    return true
  }
}

type test = (
  _root: Record<string, never>,
  _args: { id: string },
  _context: Context,
  _info: GraphQLResolveInfo
) => boolean

const obj = {} as test

function testf<TResult, TParent, TContext, TArgs>(
  arg: ResolverFn<unknown, unknown, unknown, unknown>
) {
  return null
}

testf(obj)

type Promisable<T> = T extends Promise<infer U> ? T : Promise<T> | T

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult

type ResultFromResolver<R> = R extends ResolverFn<any, any, any, any>
  ? ReturnType<R>
  : never
type ParentFromResolver<R> = R extends ResolverFn<any, infer T, any, any>
  ? T
  : never
type ContextFromResolver<R> = R extends ResolverFn<any, any, infer T, any>
  ? T
  : never
type ArgsFromResolver<R> = R extends ResolverFn<any, any, any, infer T>
  ? T
  : never

// GraphQL Shield doesn't support output rules yet, https://github.com/dimatill/graphql-shield/issues/1210
type AfterRule<TResult, TParent, TContext, TArgs> = (
  result: TResult,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<IRuleResult> | IRuleResult

export function shield<TResult, TParent, TContext, TArgs>({
  before,
  after,
}: {
  before: ShieldRule
  after: AfterRule<TResult, TParent, TContext, TArgs>
}): <
  Result extends TResult,
  Parent extends TParent,
  Context extends TContext,
  Args extends TArgs
>(
  _target: object,
  _key: string | symbol,
  descriptor: TypedPropertyDescriptor<ResolverFn<Result, Parent, Context, Args>>
) => void {
  return function (_target, _key, descriptor) {
    const original = descriptor.value
    if (!original) {
      throw new Error('No original function')
    }

    // @ts-expect-error: We don't really change the type of the function, we just wrap it.
    descriptor.value = async function (parent, args, context, info) {
      // @ts-expect-error: Graphql-shield does not provide proper types for rules.
      // https://github.com/dimatill/graphql-shield/issues/1479
      const result = await before.resolve(parent, args, context, info, {})
      if (result === true) {
        const value = await original.apply(this, [parent, args, context, info])
        const resultAfter = await after(value, parent, args, context, info)
        if (resultAfter === true) {
          return value
        } else {
          return resultAfter
        }
      } else {
        return result
      }
    }
  }
}
