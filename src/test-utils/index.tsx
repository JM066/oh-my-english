/* eslint-disable import/no-extraneous-dependencies */
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { render } from '@testing-library/react'
import { type RenderOptions, type RenderResult } from '@testing-library/react'
import { type ReactElement, type FC, type ReactNode } from 'react'

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})
const queryClient = new QueryClient()

const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{
      persister,
    }}
  >
    {children}
  </PersistQueryClientProvider>
)

const renderWithProvider = (ui: ReactElement, options: RenderOptions): RenderResult => {
  return render(ui, { wrapper, ...options })
}

export * from '@testing-library/react'

export { renderWithProvider as render }
