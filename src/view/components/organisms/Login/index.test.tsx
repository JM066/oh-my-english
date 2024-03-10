/* eslint-disable import/no-extraneous-dependencies */
import userEvent from '@testing-library/user-event'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, waitFor } from '../../../../test-utils'
import Login from './index'

const testUser = {
  email: 'mina@gmail.com',
  password: 'password12345',
}

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve('mockedSignInResponse')),
}))
// const authMock = jest.mocked(getAuth())
// const signInWithEmailAndPasswordMock = jest.mocked(
//   signInWithEmailAndPassword(authMock, testUser.email, testUser.password),
// )

describe('<Login />', () => {
  afterAll(() => {
    jest.resetAllMocks()
  })
  // test('renders', async () => {
  //   render(<Login />)
  //   const emailInput = screen.getByRole('textbox', { name: /email/i })
  //   const passwordInput = screen.getByLabelText('password')
  //   expect(emailInput).toBeInTheDocument()
  //   expect(emailInput).toHaveValue('')
  //   expect(passwordInput).toBeInTheDocument()
  //   expect(passwordInput).toHaveValue('')
  // })

  test('submit', async () => {
    const route = '/login'
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={[route]}>
        <Login />
      </MemoryRouter>,
    )
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    // const passwordInput = screen.getByLabelText('password')
    // const loginButton = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, testUser.email)

    expect(emailInput).toHaveValue(testUser.email)

    //   const authMock = getAuth()
    //   await signInWithEmailAndPassword(authMock, testUser.email, testUser.password)
    //   await waitFor(() => {
    //     expect(getAuth).toHaveBeenCalled()
    //     expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
    //       authMock,
    //       testUser.email,
    //       testUser.password,
    //     )
    //   })
  })
})
