/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ResolverFn } from '#graphql/resolver'
import type { TypeOf, ZodObject, ZodType } from 'zod'

type MethodDecorator<T> = <S extends T>(
  target: any,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<S>,
) => TypedPropertyDescriptor<S>

/**
 * Method decorator that validates the argument of the target function against the given schema.
 *
 * @export
 * @template T The type of the zod schema.
 * @param {T} arg The zod schema used for the validation.
 * @return {MethodDecorator} A {@link MethodDecorator}.
 */
export function validation<T extends ZodObject<any>>(
  arg: T | (() => T),
): MethodDecorator<(input: TypeOf<T>) => any> {
  return function (_target, _propertyKey, descriptor) {
    const originalMethod = descriptor.value!
    // @ts-expect-error: should be fine
    descriptor.value = function (input) {
      const schema = typeof arg === 'function' ? arg() : arg
      const result = schema.parse(input)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return originalMethod.call(this, result)
    }
    return descriptor
  }
}

type ZodResolver<T extends ZodType<any, any, any>> = ResolverFn<
  any,
  any,
  any,
  { input: TypeOf<T> }
>

/**
 * Method decorator that validates the argument of the target function against the given schema.
 *
 * @export
 * @template T The type of the zod schema.
 * @param {T} arg The zod schema used for the validation.
 * @return {MethodDecorator} A {@link MethodDecorator}.
 */
export function validateInput<T extends ZodObject<any>>(
  arg: T | (() => T),
): MethodDecorator<ZodResolver<T>> {
  return function (_target, _propertyKey, descriptor) {
    const originalMethod = descriptor.value
    if (!originalMethod) {
      throw new Error('validateInput can only be used on methods')
    }
    // @ts-expect-error: should be fine
    descriptor.value = function (root, { input }, context, info) {
      const schema = typeof arg === 'function' ? arg() : arg
      const result = schema.safeParse(input)

      if (result.success) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return originalMethod.call(
          this,
          root,
          { input: result.data },
          context,
          info,
        )
      } else {
        return { problems: result.error.issues }
      }
    }
    return descriptor
  }
}
