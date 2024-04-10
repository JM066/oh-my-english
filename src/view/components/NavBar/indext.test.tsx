import { Timestamp } from 'firebase/firestore'
import NavBar from '.'
import { render, screen } from '../../../test-utils'
import Login from '../organisms/Login'

test('greets the user', () => {
  render(<NavBar />, {
    preloadedState: {
      auth: {
        data: {
          displayName: 'Mina',
          userId: 'dddd',
          created_at: Timestamp.now(),
          email: 'mina@gmail.com',
          level: 0,
          token: 'dafeg',
        },
        isFetched: true,
        isLoggedIn: true,
        isRegistered: true,
        status: 'idle',
        error: null,
      },
    },
  })
  expect(screen.getByText(/Mina/i)).toBeInTheDocument()
})

test('redirects to signin if user is falsy', async () => {
  render(<Login isLoggedIn={false} user={undefined} />, { route: '/login' })
  expect(await screen.findByText('Login')).toBeInTheDocument()
})
