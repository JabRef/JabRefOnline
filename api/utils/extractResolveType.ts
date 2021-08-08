import { ResolversObject } from '../graphql'

type ResolveFnc<TResolver extends ResolversObject<unknown>> =
  TResolver extends {
    __resolveType: infer T
  }
    ? T
    : never
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- unknown doesn't work to match arbitrary arguments
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : unknown
/**
 * Type to extract the resolve type from a resolver for unions / interfaces.
 * Workaround for feature request https://github.com/dotansimha/graphql-code-generator/issues/6443
 */
export type ResolveType<TResolver extends ResolversObject<unknown>> =
  ReturnType<ResolveFnc<TResolver>>
