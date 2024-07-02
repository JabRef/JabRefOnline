import { mock, type MockProxy } from 'vitest-mock-extended'
import { type Context } from '~/server/context'

export function createUnauthenticatedContext(): MockProxy<Context> {
  const context = mock<Context>()
  context.getUser.mockImplementation(() => Promise.resolve(null))
  return context
}
