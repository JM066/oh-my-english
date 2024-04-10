/* eslint-disable import/no-extraneous-dependencies */
import { type ReactElement, type ReactNode } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import userEvent from '@testing-library/user-event'
import { mount } from 'cypress/react'
import { appStore, configureStoreWithMiddlewares, type RootState } from '../stores/appStore'
import ErrorFallback from '../view/components/errors/ErrorFallback'
import '../../cypress/support/component'

// type CustomRenderOptions = {
//   preloadedState?: Partial<RootState>
//   route?: string
//   renderOptions?: Omit<RenderOptions, 'wrapper'>
// }

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
})

// function renderWithProviders(
//   ui: ReactElement,
//   { preloadedState = {}, route = '/', ...renderOptions }: CustomRenderOptions = {},
// ) {
//   function Wrapper({ children }: { children?: ReactNode }): ReactElement {
//     const store = configureStoreWithMiddlewares(preloadedState)
//     window.history.pushState({}, 'Home', route)

//     return (
//       <ErrorBoundary FallbackComponent={ErrorFallback}>
//         <QueryClientProvider client={queryClient}>
//           <Provider store={store}>
//             <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
//           </Provider>
//         </QueryClientProvider>
//       </ErrorBoundary>
//     )
//   }
//   return { user: userEvent.setup(), ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
// }
Cypress.Commands.add('mount', (component: React.ReactNode, options = {}) => {
  const {
    routerProps = { initialEntries: ['/'] },
    reduxStore = appStore,
    ...mountOptions
  } = options

  const wrapped = (
    <MemoryRouter {...routerProps}>
      <QueryClientProvider client={queryClient}>
        <Provider store={reduxStore}>{component}</Provider>
      </QueryClientProvider>
    </MemoryRouter>
  )

  return mount(wrapped, mountOptions)
})

// export * from '@testing-library/react'

// export { renderWithProviders as render }
