import { render as rtlRender, type RenderOptions, type RenderResult } from '@testing-library/react'
import { type ReactElement, type ReactNode } from 'react'
import { Provider } from 'react-redux'
import { configureStoreWithMiddlewares, type RootState } from '../stores/appStore'

type CustomRenderOptions = {
  preloadedState?: RootState
  renderOptions?: Omit<RenderOptions, 'wrapper'>
}

function render(
  ui: ReactElement,
  { preloadedState = {}, ...renderOptions }: CustomRenderOptions = {},
): RenderResult {
  function Wrapper({ children }: { children?: ReactNode }): ReactElement {
    const store = configureStoreWithMiddlewares(preloadedState)

    return <Provider store={store}>{children}</Provider>
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'

// override render method and export history
export { render }
