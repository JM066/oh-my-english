import { Outlet } from 'react-router-dom'
import useBreakPoint from '../../hooks/useBreakPoint'
import Header from '../../components/Header'

function MainLayout({ children }) {
  const { isMobileView } = useBreakPoint()
  return (
    <div className='tw-w-full tw-h-full'>
      <Header />
      {children}
    </div>
  )
}
export default MainLayout
