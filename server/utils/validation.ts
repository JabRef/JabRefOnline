/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResolverFn } from '#graphql/resolver'
import { AnyZodObject, TypeOf, ZodType } from 'zod'

type MethodDecorator<T> = <S extends T>(
  target: any,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<S>
) => TypedPropertyDescriptor<S> | void

/**
 * Method decorator that validates the argument of the target function against the given schema.
 *
 * @export
 * @template T The type of the zod schema.
 * @param {T} arg The zod schema used for the validation.
 * @return {MethodDecorator} A {@link MethodDecorator}.
 */
export function validation<T extends AnyZodObject>(
  arg: T | (() => T)
): MethodDecorator<(input: TypeOf<T>) => any> {
  return function (_target, _propertyKey, descriptor) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
export function validateInput<T extends AnyZodObject>(
  arg: T | (() => T)
): MethodDecorator<ZodResolver<T>> {
  return function (_target, _propertyKey, descriptor) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const originalMethod = descriptor.value!
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
          info
        )
      } else {
        return { problems: result.error.issues }
      }
    }
    return descriptor
  }
}
