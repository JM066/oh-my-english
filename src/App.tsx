import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loading from './view/components/Loading'
import Home from './view/pages/Home'
import Test from './view/pages/Test'
import './App.css'
import TestLayout from './view/layout/TestLayout'

const loading = () => <Loading />

function App() {
  return (
    <Suspense fallback={loading()}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/test' element={<TestLayout />}>
          <Route path='/test/:id' element={<Test />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
