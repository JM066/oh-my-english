/* eslint-disable import/no-extraneous-dependencies */
import { type ReactElement, type ReactNode } from 'react'
import { render, type RenderOptions, type RenderResult } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import store from '../stores/appStore'
import ErrorFallback from '../view/components/errors/ErrorFallback'

type CustomRenderOptions = {
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
  { route = '/', ...renderOptions }: CustomRenderOptions = {},
): RenderResult {
  window.history.pushState({}, 'Initial Page', route)
  function Wrapper({ children }: { children?: ReactNode }): ReactElement {
    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <MemoryRouter>{children}</MemoryRouter>
          </QueryClientProvider>
        </Provider>
      </ErrorBoundary>
    )
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'

export { renderWithProviders as render }
