import { mock, mockReset } from 'vitest-mock-extended'
import { createUnauthenticatedContext } from '~/test/context.helper'
import { register, resolve } from '../tsyringe'
import { AuthService } from './auth.service'

const authService = mock<AuthService>()
register('AuthService', { useValue: authService })
const mutation = resolve('UserMutation')

const context = createUnauthenticatedContext()

beforeEach(() => {
  mockReset(authService)
})

describe('mutation', () => {
  describe('signup', () => {
    it('fails if password is too short', async () => {
      const result = await mutation.signup(
        {},
        {
          input: {
            email: 'test@test.de',
            password: '123',
          },
        },
        context
      )
      expect(result).toMatchInlineSnapshot(`
        {
          "problems": [
            {
              "code": "too_small",
              "inclusive": true,
              "message": "The password must be at least 8 characters long",
              "minimum": 8,
              "path": [
                "password",
              ],
              "type": "string",
            },
          ],
        }
      `)
    })
  })
})
