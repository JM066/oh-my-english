import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './view/provider/AuthProvider'
import Loading from './view/components/loading/Loading'

import MainLayout from './view/layout/MainLayout'
import './App.css'
import AppRoute from './utils/routes'
import { ViewportProvider } from './view/provider/ViewportProvider'

const loading = () => <Loading />
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

function App() {
  const routes = AppRoute().map((route, idx) => {
    const key = `route_${idx}`

    return (
      <Route key={key} path={route.path} element={<route.Component />}>
        {route.subRoutes?.map((subRoute, subIdx) => {
          const subKey = `subRoute_${subIdx}`
          return (
            <Route key={`${key}_${subKey}`} path={subRoute.path} element={<subRoute.Component />} />
          )
        })}
      </Route>
    )
  })

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
      }}
    >
      <Suspense fallback={loading()}>
        <AuthProvider>
          <ViewportProvider>
            <MainLayout>
              <Toaster
                position='top-right'
                toastOptions={{
                  duration: 3000,
                }}
              />
              <Routes>{routes}</Routes>
            </MainLayout>
          </ViewportProvider>
        </AuthProvider>
      </Suspense>
      <ReactQueryDevtools />
    </PersistQueryClientProvider>
  )
}

export default App
