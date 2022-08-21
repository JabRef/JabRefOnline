import mocking, { MockProxy } from 'jest-mock-extended'
import { Context } from '~/server/context'

export function createUnauthenticatedContext(): MockProxy<Context> {
  const context = mocking.mock<Context>()
  context.getUser.mockImplementation(() => null)
  context.isAuthenticated.mockImplementation(() => false)
  context.isUnauthenticated.mockImplementation(() => true)
  return context
}
