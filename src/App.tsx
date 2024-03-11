import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import Loading from './view/components/loading/Loading'
import Home from './view/pages/Home'
import Test from './view/pages/Test'
import './App.css'
import TestLayout from './view/layout/TestLayout'
import AuthProvider from './view/provider/AuthProvider'
import Header from './view/components/Header'
import SignIn from './view/pages/SignIn'

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
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
      }}
    >
      <Suspense fallback={loading()}>
        <AuthProvider>
          <Toaster
            position='top-right'
            toastOptions={{
              duration: 3000,
            }}
          />
          {/* <Header /> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<SignIn />} />
            <Route path='/test' element={<TestLayout />}>
              <Route path='/test/:id' element={<Test />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Suspense>
      <ReactQueryDevtools />
    </PersistQueryClientProvider>
  )
}

export default App
