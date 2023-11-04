import { Outlet } from 'react-router-dom'
import Text from '../../components/atoms/Text'

function TestLayout() {
  return (
    <div className='w-full h-full'>
      <Text text='Test Provider' />
      <Outlet />
    </div>
  )
}
export default TestLayout
