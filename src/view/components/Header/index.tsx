import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../stores/appStore'
import Button from '../atoms/Button'
import Text from '../atoms/Text'

function Header() {
  const { auth } = useAppSelector((state) => state)
  const navigate = useNavigate()

  if (!auth.isLoggedIn) {
    return (
      <Button theme='Inverted' size='Medium' onPress={() => navigate('login')}>
        Login / SignUp
      </Button>
    )
  }

  return (
    <header>
      <nav>
        <Text as='p' text={auth.data?.displayName || auth.data?.email} />
      </nav>
    </header>
  )
}
export default Header
