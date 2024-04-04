import { type Key } from 'react'
import { Item } from 'react-stately'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../stores/appStore'
import Text from '../atoms/Text'
import Dropdown from '../atoms/Dropdown'

function NavBar() {
  const { isLoggedIn, isFetched, data } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()

  const onAction = (key: Key) => {
    navigate(`/${key}`)
  }
  const renderUserStatus = () => {
    const loginStatus = isLoggedIn ? 'logout' : 'login'
    return (
      <Dropdown label={isLoggedIn ? data?.displayName : 'Login'} onAction={onAction}>
        <Item key='setting' textValue='setting'>
          Setting
        </Item>
        <Item key={loginStatus} textValue={loginStatus}>
          <Text as='p' text={loginStatus[0].toUpperCase() + loginStatus.substring(1)} />
        </Item>
      </Dropdown>
    )
  }
  return (
    <nav className='tw-w-full tw-flex tw-items-center tw-justify-between tw-shadow-lg'>
      <Text text='Logo' />

      {isFetched && renderUserStatus()}
    </nav>
  )
}
export default NavBar
