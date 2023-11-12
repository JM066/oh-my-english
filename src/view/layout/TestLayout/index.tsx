import { Outlet } from 'react-router-dom'
import Text from '../../components/atoms/Text'
import Box from '../../components/atoms/Box'

function TestLayout() {
  return (
    <div className='tw-w-full tw-h-full'>
      <Box className='tw-w-full tw-flex tw-flex-col tw-items-center'>
        <Text text='Test' size='Large' />
      </Box>
      <Outlet />
    </div>
  )
}
export default TestLayout
