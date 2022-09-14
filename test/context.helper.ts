import { mock, MockProxy } from 'vitest-mock-extended'
import { Context } from '~/server/context'

export function createUnauthenticatedContext(): MockProxy<Context> {
  const context = mock<Context>()
  context.getUser.mockImplementation(() => null)
  context.isAuthenticated.mockImplementation(() => false)
  context.isUnauthenticated.mockImplementation(() => true)
  return context
}
