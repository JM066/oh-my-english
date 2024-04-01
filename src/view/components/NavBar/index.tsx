import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../stores/appStore'
import Button from '../atoms/Button'
import Text from '../atoms/Text'

function NavBar() {
  const auth = useAppSelector((state) => state.auth)
  const navigate = useNavigate()

  return (
    <nav className='tw-w-full tw-flex tw-items-center tw-justify-between tw-h-14 tw-shadow-lg'>
      <Text text='Logo' />
      {!auth.isLoggedIn ? (
        <Button theme='Ghost' size='Medium' className='tw-h-full ' onPress={() => navigate('join')}>
          Login / SignUp
        </Button>
      ) : (
        <Text as='p' text={auth.data?.displayName || auth.data?.email} />
      )}
    </nav>
  )
}
export default NavBar
