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

function then<T, V>(
  value: PromiseOrValue<T>,
  onValue: (t: T, sync?: true) => PromiseOrValue<V>,
  onError: (error: any) => PromiseOrValue<V> = (e) => {
    throw e
  }
): PromiseOrValue<V> {
  if (value instanceof Promise) {
    return value.then(onValue).catch(onError)
  }
  try {
    return onValue(value, true)
  } catch (e) {
    return onError(e)
  }
}

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
    descriptor.value = function (parent, args, context, info) {
      return then(
        before
          ? // @ts-expect-error: Graphql-shield does not provide proper types for rules.
            // https://github.com/dimatill/graphql-shield/issues/1479
            before.resolve(parent, args, context, info, {})
          : true,
        (result) => {
          if (result === true) {
            return then(
              original.apply(this, [parent, args, context, info]),
              (value) => {
                return then(
                  after ? after(value, parent, args, context, info) : true,
                  (resultAfter) => {
                    if (resultAfter === true) {
                      return value
                    } else {
                      return resultAfter
                    }
                  }
                )
              }
            )
          } else {
            return result
          }
        }
      )
    }
  }
}
