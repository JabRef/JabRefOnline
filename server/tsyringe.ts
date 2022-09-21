import type { PrismaClient } from '@prisma/client'
import {
  ClassProvider,
  container,
  DependencyContainer,
  FactoryProvider,
  inject as tsyringeInject,
  Lifecycle,
  Provider,
  RegistrationOptions,
  TokenProvider,
  ValueProvider,
} from 'tsyringe'
import { constructor } from 'tsyringe/dist/typings/types'
import type * as DocumentResolvers from './documents/resolvers'
import type { UserDocumentService } from './documents/user.document.service'
import type * as GroupResolvers from './groups/resolvers'
import type { GroupService } from './groups/service'
import type { AuthService } from './user/auth.service'
import type PassportInitializer from './user/passport-initializer'
import type * as UserResolvers from './user/resolvers'
import { RedisClient } from './utils/services.factory'

export { injectable, instanceCachingFactory } from 'tsyringe'

type InjectionSymbol<T> = { sym: symbol; value: T | undefined }

/**
 * Define a new injection token.
 * @param name The name of the token.
 *
 * @note We use currying here as a workaround for the fact that the typescript compiler does not support partial inference:
 * https://github.com/microsoft/TypeScript/issues/26242
 */
function injectSymbol<S extends string>(
  name: S
): <T>() => Record<S, InjectionSymbol<T>> {
  return <T>() => {
    const res = {} as Record<S, InjectionSymbol<T>>
    res[name] = { sym: Symbol(name), value: undefined }
    return res
  }
}

export const InjectionSymbols = {
  // Tools
  ...injectSymbol('PrismaClient')<typeof PrismaClient>(),
  ...injectSymbol('RedisClient')<RedisClient>(),
  ...injectSymbol('PassportInitializer')<typeof PassportInitializer>(),
  // Services
  ...injectSymbol('UserDocumentService')<typeof UserDocumentService>(),
  ...injectSymbol('AuthService')<typeof AuthService>(),
  ...injectSymbol('GroupService')<typeof GroupService>(),
  // Resolvers
  ...injectSymbol('DocumentQuery')<typeof DocumentResolvers.Query>(),
  ...injectSymbol('DocumentMutation')<typeof DocumentResolvers.Mutation>(),
  ...injectSymbol('DocumentResolver')<
    typeof DocumentResolvers.DocumentResolver
  >(),
  ...injectSymbol('JournalArticleResolver')<
    typeof DocumentResolvers.JournalArticleResolver
  >(),
  ...injectSymbol('ProceedingsArticleResolver')<
    typeof DocumentResolvers.ProceedingsArticleResolver
  >(),
  ...injectSymbol('ThesisResolver')<typeof DocumentResolvers.ThesisResolver>(),
  ...injectSymbol('OtherResolver')<typeof DocumentResolvers.OtherResolver>(),

  ...injectSymbol('GroupQuery')<typeof GroupResolvers.Query>(),
  ...injectSymbol('GroupMutation')<typeof GroupResolvers.Mutation>(),
  ...injectSymbol('GroupResolver')<typeof GroupResolvers.GroupResolver>(),

  ...injectSymbol('UserQuery')<typeof UserResolvers.Query>(),
  ...injectSymbol('UserMutation')<typeof UserResolvers.Mutation>(),
  ...injectSymbol('UserResolver')<typeof UserResolvers.UserResolver>(),
  ...injectSymbol('LoginPayloadResolver')<
    typeof UserResolvers.LoginPayloadResolver
  >(),
  ...injectSymbol('SignupPayloadResolver')<
    typeof UserResolvers.SignupPayloadResolver
  >(),
  ...injectSymbol('ChangePasswordPayloadResolver')<
    typeof UserResolvers.ChangePasswordPayloadResolver
  >(),
}

type Token = keyof typeof InjectionSymbols

/**
 * Parameter decorator factory that allows for interface information to be stored in the constructor's metadata.
 *
 * We use this approach using an explicit token instead of tsyringe's automatic detection of the type to not rely
 * on typescript's metadata via `emitDecoratorMetadata` which is not supported by esbuild.
 *
 * @param token The token to inject.
 * @return The parameter decorator.
 *
 * TODO: Restrict targets to be constructors whose corresponding arg has the correct type.
 * Depends on https://github.com/Microsoft/TypeScript/issues/30102 and/or https://github.com/microsoft/TypeScript/issues/43132.
 */
export function inject(
  token: Token
): (target: any, propertyKey: string | symbol, parameterIndex: number) => void {
  return tsyringeInject(InjectionSymbols[token].sym)
}

type TypeOfSymbol<T> = T extends InjectionSymbol<infer X> ? X : never
type InstanceTypeOrPlain<T> = T extends constructor<any> ? InstanceType<T> : T
type ValueOfSymbol<T> = InstanceTypeOrPlain<TypeOfSymbol<T>>
type ValueOfToken<T extends Token> = ValueOfSymbol<typeof InjectionSymbols[T]>

const injectionSymbolToConstructor = new Map<symbol, constructor<any>>()
/**
 * Resolve a token into an instance.
 *
 * @param token The dependency token.
 * @return An instance of the dependency.
 */
export function resolve<T extends Token>(
  token: T
): ValueOfSymbol<typeof InjectionSymbols[T]> {
  const symb = InjectionSymbols[token].sym
  // If explicitly registered, use that
  if (container.isRegistered(symb)) {
    return container.resolve(symb)
  }

  const constr = injectionSymbolToConstructor.get(symb)
  if (constr !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return container.resolve(constr)
  } else {
    throw new Error(`No constructor registered for ${symb.toString()}`)
  }
}
// https://stackoverflow.com/questions/51419176/how-to-get-a-subset-of-keyof-t-whose-value-tk-are-callable-functions-in-typ
type FilterByType<T, V> = {
  [P in keyof T as T[P] extends V ? P : never]: T[P]
}
type InjectionSymbolsWithValue = {
  [K in keyof typeof InjectionSymbols]: TypeOfSymbol<typeof InjectionSymbols[K]>
}

type ConstructableSymbols = {
  [P in keyof FilterByType<
    InjectionSymbolsWithValue,
    constructor<any>
  >]: typeof InjectionSymbols[P]
}

/**
 * Register a constructor as fallback if no explicit value has been provided for the given token.
 * TODO: Rename to register, provide all overloads, remove symbol -> constructor map
 */
export function fallback<T extends keyof ConstructableSymbols>(
  token: T,
  target: TypeOfSymbol<ConstructableSymbols[T]>
): void {
  injectionSymbolToConstructor.set(InjectionSymbols[token].sym, target)
}

/**
 * Register a dependency provider.
 *
 * @param provider {Provider} The dependency provider
 */
export function register<T extends Token>(
  token: T,
  provider: ValueProvider<ValueOfToken<T>>
): DependencyContainer
export function register<T extends Token>(
  token: T,
  provider: FactoryProvider<ValueOfToken<T>>
): DependencyContainer
export function register<T extends Token>(
  token: T,
  provider: TokenProvider<ValueOfToken<T>>,
  options?: RegistrationOptions
): DependencyContainer
export function register<T extends keyof ConstructableSymbols>(
  token: T,
  provider: ClassProvider<ValueOfToken<T>>,
  options?: RegistrationOptions
): DependencyContainer
export function register<T extends keyof ConstructableSymbols>(
  token: T,
  provider: constructor<ValueOfToken<T>>,
  options?: RegistrationOptions
): DependencyContainer
export function register<T extends Token>(
  token: T,
  providerOrConstructor:
    | Provider<ValueOfToken<T>>
    | constructor<ValueOfToken<T>>,
  options: RegistrationOptions = { lifecycle: Lifecycle.Transient }
): DependencyContainer {
  return container.register(
    InjectionSymbols[token].sym,
    // @ts-expect-error: There is a problem with the overloads, don't know why
    providerOrConstructor,
    options
  )
}
