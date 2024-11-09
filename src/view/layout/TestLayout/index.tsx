import { Outlet } from 'react-router-dom'
import TestTopic from '../../components/TestTopic'

function TestLayout() {
  return (
    <div className='tw-w-full tw-h-full'>
      <TestTopic />
      <Outlet />
    </div>
  )
}
export default TestLayout
