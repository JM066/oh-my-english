import { useAppSelector } from '../../../stores/appStore'
import Text from '../atoms/Text'
import ModalTrigger from '../atoms/ModalTrigger'
import Button from '../atoms/Button'

function NavBar() {
  const { isLoggedIn, isFetched, data } = useAppSelector((state) => state.auth)
  const renderModal = (close: () => void) => {
    return (
      <div className='tw-w-full'>
        <Button onPress={close}>X</Button>
        {isLoggedIn ? <Button>Logout</Button> : <Button>Loggin</Button>}
      </div>
    )
  }
  const renderUserStatus = () => {
    return (
      <ModalTrigger
        trigger={
          isLoggedIn ? <Text as='p' text={data?.displayName} /> : <Text as='p' text='Login' />
        }
        modal={renderModal}
        triggerProps={{
          className: 'tw-outline-none tw-bg-gray-500',
        }}
        modalClassName='tw-top-0 tw-2/3 tw-h-99 tw-bg-gray-300'
      />
    )
  }
  return (
    <nav className='tw-w-full tw-flex tw-items-center tw-justify-between tw-h-14 tw-shadow-lg'>
      <Text text='Logo' />
      {isFetched && renderUserStatus()}
    </nav>
  )
}
export default NavBar
