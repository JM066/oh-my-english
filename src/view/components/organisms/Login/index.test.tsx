/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './index'

const testUser = {
  email: 'mina@gmail.com',
  password: 'password12345',
}
describe('<Login />', () => {
  test('renders', async () => {
    const user = userEvent.setup()
    render(<Login />)
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByRole('textbox', { name: /password/i })

    await user.type(emailInput, testUser.email)
    await user.type(passwordInput, testUser.password)

    expect(emailInput).toHaveTextContent(testUser.email)
    // TOdo: mock submit
  })
})
