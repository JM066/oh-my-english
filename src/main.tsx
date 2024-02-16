import { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Loading from './view/components/Loading'
import Home from './view/pages/Home'
import Test from './view/pages/Test'
import './App.css'
import TestLayout from './view/layout/TestLayout'
import './wdyr'
import './index.css'

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 60,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
      }}
    >
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/test' element={<TestLayout />}>
              <Route path='/test/:id' element={<Test />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </PersistQueryClientProvider>
  </StrictMode>,
)
