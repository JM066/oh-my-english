import { type Key } from 'react'
import { Item } from 'react-stately'
import { useNavigate } from 'react-router-dom'
import { useErrorBoundary } from 'react-error-boundary'
import { useAppDispatch, useAppSelector } from '../../../../stores/appStore'
import Text from '../../atoms/Text'
import Dropdown from '../../atoms/Dropdown'
import { userLogout } from '../../../../redux/authSlice'

function NavBar() {
  const { isLoggedIn, data } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const appDispatch = useAppDispatch()
  const { showBoundary } = useErrorBoundary()
  const loginStatus = isLoggedIn ? 'logout' : 'login'

  const onLogout = async () => {
    try {
      appDispatch(userLogout()).then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          navigate('/')
        }
      })
    } catch (error: unknown) {
      showBoundary(error)
    }
  }
  const onAction = (key: Key) => {
    if (key === 'logout') {
      onLogout()
    }
    navigate(`/${key}`)
  }
  const renderUserStatus = (
    <Dropdown label='My Page' onAction={onAction}>
      <Item key={loginStatus} textValue={loginStatus}>
        <Text
          as='p'
          text={`${data?.displayName || ''} ${
            loginStatus[0].toUpperCase() + loginStatus.substring(1)
          }`}
        />
      </Item>
      <Item key='setting' textValue='setting'>
        Setting
      </Item>
    </Dropdown>
  )

  return (
    <nav className='tw-w-full tw-flex tw-items-center tw-justify-between tw-shadow-lg'>
      <Text text='Logo' />
      {data && renderUserStatus}
    </nav>
  )
}
export default NavBar
