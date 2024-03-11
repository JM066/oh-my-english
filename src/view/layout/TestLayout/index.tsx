import { Outlet } from 'react-router-dom'
import TestTopic from '../../components/TestTopic'
import useBreakPoint from '../../hooks/useBreakPoint'

function TestLayout() {
  return (
    <div className='tw-w-full tw-h-full'>
      <TestTopic />
      <Outlet />
    </div>
  )
}
export default TestLayout
