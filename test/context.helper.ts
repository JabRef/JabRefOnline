import { mock, MockProxy } from 'jest-mock-extended'
import { Context } from '~/api/context'

export function createUnauthenticatedContext(): MockProxy<Context> {
  const context = mock<Context>()
  context.getUser.mockImplementation(() => null)
  context.isAuthenticated.mockImplementation(() => false)
  context.isUnauthenticated.mockImplementation(() => true)
  return context
}
