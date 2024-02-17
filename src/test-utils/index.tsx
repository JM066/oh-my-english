/* eslint-disable import/no-extraneous-dependencies */
import { type ReactElement, type ReactNode } from 'react'
import { render, type RenderOptions, type RenderResult } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStoreWithMiddlewares, type RootState } from '../stores/appStore'

type CustomRenderOptions = {
  preloadedState?: RootState
  route?: string
  renderOptions?: Omit<RenderOptions, 'wrapper'>
}

function renderWithRouterAndStore(
  ui: ReactElement,
  { preloadedState = {}, route = '/', ...renderOptions }: CustomRenderOptions = {},
): RenderResult {
  window.history.pushState({}, 'Initial Page', route)
  function Wrapper({ children }: { children?: ReactNode }): ReactElement {
    const store = configureStoreWithMiddlewares(preloadedState)

    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    )
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'

export { renderWithRouterAndStore as render }
