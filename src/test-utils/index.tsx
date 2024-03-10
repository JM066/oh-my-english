/* eslint-disable import/no-extraneous-dependencies */
import { type ReactElement, type ReactNode } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { configureStoreWithMiddlewares, type RootState } from '../stores/appStore'
import ErrorFallback from '../view/components/errors/ErrorFallback'

type CustomRenderOptions = {
  preloadedState?: Partial<RootState>
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
  { preloadedState = {}, ...renderOptions }: CustomRenderOptions = {},
) {
  function Wrapper({ children }: { children?: ReactNode }): ReactElement {
    const store = configureStoreWithMiddlewares(preloadedState)

    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>{children}</Provider>
        </QueryClientProvider>
      </ErrorBoundary>
    )
  }
  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export * from '@testing-library/react'

export { renderWithProviders as render }
