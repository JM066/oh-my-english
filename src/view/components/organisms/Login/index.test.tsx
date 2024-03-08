/* eslint-disable import/no-extraneous-dependencies */
import userEvent from '@testing-library/user-event'
import { render, screen } from '../../../../test-utils'
import Login from './index'
// import store from '../../../../stores/appStore'

beforeEach(async () => {
  // Todo : clear the store
  jest.clearAllMocks()
})

const testUser = {
  email: 'mina@gmail.com',
  password: 'password12345',
}
jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
  }
})
describe('<Login />', () => {
  test('renders', async () => {
    render(<Login />)
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByLabelText('password')
    // Todo : getByRole textbox is not working - find out
    // const loginButton = screen.getByRole('button', { name: /login/i })

    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveValue('')
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveValue('')
    // expect(loginButton).toBeDisabled()
  })

  test('submit', async () => {
    const user = userEvent.setup()
    render(<Login />)
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByLabelText('password')
    const loginButton = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, testUser.email)
    await user.type(passwordInput, testUser.password)
    expect(loginButton).toBeEnabled()
    await user.click(loginButton)
    // Todo : directs to the main page
    // await waitFor(() => {
    //   const state = store.getState()
    //   expect(state.auth.isLoggedIn).toBe(true)
    // })
  })
})
