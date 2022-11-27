import { GraphQLResolveInfo } from 'graphql'
import { IRuleResult, ShieldRule } from 'graphql-shield/typings/types'

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult

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
  before?: ShieldRule
  // TODO: Bind the return type of the resolver to the type of the rule
  after?: AfterRule<any, TParent, TContext, TArgs>
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
      const result = before
        ? await before.resolve(parent, args, context, info, {})
        : true
      if (result === true) {
        let value = original.apply(this, [parent, args, context, info])
        value = value instanceof Promise ? await value : value
        const resultAfter = after
          ? await after(value, parent, args, context, info)
          : true
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
