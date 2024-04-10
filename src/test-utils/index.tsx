/* eslint-disable import/no-extraneous-dependencies */
import { type ReactElement, type ReactNode } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import userEvent from '@testing-library/user-event'
import { configureStoreWithMiddlewares, type RootState } from '../stores/appStore'
import ErrorFallback from '../view/components/errors/ErrorFallback'

type CustomRenderOptions = {
  preloadedState?: Partial<RootState>
  route?: string
  renderOptions?: Omit<RenderOptions, 'wrapper'>
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
})

function renderWithProviders(
  ui: ReactElement,
  { preloadedState = {}, route = '/', ...renderOptions }: CustomRenderOptions = {},
) {
  function Wrapper({ children }: { children?: ReactNode }): ReactElement {
    const store = configureStoreWithMiddlewares(preloadedState)
    window.history.pushState({}, 'Home', route)

    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MemoryRouter initialEntries={[route]}>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>{children}</Provider>
          </QueryClientProvider>
        </MemoryRouter>
      </ErrorBoundary>
    )
  }
  return { user: userEvent.setup(), ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export * from '@testing-library/react'

export { renderWithProviders as render }
