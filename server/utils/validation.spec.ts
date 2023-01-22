import { z } from 'zod'
import { validateInput, validation } from './validation'

const schema = z.object({
  name: z.string().min(3).max(10),
  age: z.number().min(18),
})

class Test {
  @validation(schema)
  hello(input: { name: string; age: number }) {
    return 'test'
  }

  // @ts-expect-error: This should fail because the argument type does not match the schema.
  @validation(schema)
  not_matching(input: { nothing: string }) {
    return 'test'
  }

  @validation(() => schema)
  with_factory(input: { name: string; age: number }) {
    return 'test'
  }
}
const test = new Test()

describe('validated function', () => {
  it('returns function value if args are valid', () => {
    expect(test.hello({ name: 'test', age: 18 })).toBe('test')
  })
  it('throws if args are invalid', () => {
    expect(() => test.hello({ name: 'test', age: 17 })).toThrow()
  })
})

describe('validated function with factory', () => {
  it('returns function value if args are valid', () => {
    expect(test.with_factory({ name: 'test', age: 18 })).toBe('test')
  })
  it('throws if args are invalid', () => {
    expect(() => test.with_factory({ name: 'test', age: 17 })).toThrow()
  })
})

class TestResolver {
  @validateInput(schema)
  hello(
    _root: Record<string, never>,
    { input }: { input: { name: string; age: number } },
    _context: Record<string, never>
  ): string {
    return 'test'
  }

  @validateInput(schema)
  without_root_and_context({
    input,
  }: {
    input: { name: string; age: number }
  }): string {
    return 'test'
  }

  // @ts-expect-error: This should fail because the argument type does not match the schema.
  @validation(schema)
  not_matching(input: { nothing: string }) {
    return 'test'
  }

  @validation(() => schema)
  with_factory(input: { name: string; age: number }) {
    return 'test'
  }
}
const testResolver = new TestResolver()

describe('validated resolver', () => {
  it('returns function value if args are valid', () => {
    expect(
      testResolver.hello({}, { input: { name: 'test', age: 18 } }, {})
    ).toBe('test')
  })
  it('returns issues if args are invalid', () => {
    expect(testResolver.hello({}, { input: { name: 'test', age: 17 } }, {}))
      .toMatchInlineSnapshot(`
        {
          "problems": [
            {
              "code": "too_small",
              "exact": false,
              "inclusive": true,
              "message": "Number must be greater than or equal to 18",
              "minimum": 18,
              "path": [
                "age",
              ],
              "type": "number",
            },
          ],
        }
      `)
  })
})

describe('validated resolver with factory', () => {
  it('returns function value if args are valid', () => {
    expect(testResolver.with_factory({ name: 'test', age: 18 })).toBe('test')
  })
  it('throws if args are invalid', () => {
    expect(() => testResolver.with_factory({ name: 'test', age: 17 })).toThrow()
  })
})
