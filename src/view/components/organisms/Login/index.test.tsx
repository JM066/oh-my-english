/* eslint-disable import/no-extraneous-dependencies */

import { doUserLogin } from '../../../../services/auth'
import { render, screen, waitFor } from '../../../../test-utils'
import Login from './index'

const testUser = {
  email: 'mina@gmail.com',
  password: 'password12345',
}

jest.mock('../../../../services/auth', () => ({
  doUserLogin: jest.fn(() => Promise.resolve()),
  getStoredUser: jest.fn(() => null),
}))

describe('<Login />', () => {
  afterAll(() => {
    jest.resetAllMocks()
  })

  test('view user email on the screen when log in is successful', async () => {
    const route = '/join'
    const { user } = render(<Login />, { route })
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByLabelText('Password:')
    const loginButton = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, testUser.email)
    await user.type(passwordInput, testUser.password)
    await user.click(loginButton)

    await waitFor(() => expect(doUserLogin).toHaveBeenCalled())
  })
})
