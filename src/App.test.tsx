/* eslint-disable import/no-extraneous-dependencies */
import { type FC, type ReactNode } from 'react'
import { render, renderHook, waitFor, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import useFetchTests from './view/hooks/api/useFetchTests'

const queryClient = new QueryClient()
const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('<App />', () => {
  // eslint-disable-next-line vitest/expect-expect
  test('renders', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )
    const foodButton = screen.getByRole('button', {
      name: /food/i,
    })
    await user.click(foodButton)
    const { result } = renderHook(() => useFetchTests('food'), { wrapper })
    await waitFor(() => result.current.isSuccess)

    expect(result.current.tests).toEqual({})
  })
})
