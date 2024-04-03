import { useAppSelector } from '../../../stores/appStore'
import Text from '../atoms/Text'
import ModalTrigger from '../atoms/ModalTrigger'
import Button from '../atoms/Button'

function NavBar() {
  const { isLoggedIn, isFetched, data } = useAppSelector((state) => state.auth)
  const renderModal = (close: () => void) => {
    return (
      <div className='tw-h-1/3 tw-w-full'>
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
        customTriggerProps={{
          theme: 'Ghost',
          className: 'tw-z-[50]',
        }}
        // triggerClassname='tw-relative tw-p-2'
        modalClassName='tw-top-0 tw-right-0 tw-w-2/3 tw-h-[500px]'
      />
    )
  }
  return (
    <nav className='tw-w-full tw-flex tw-items-center tw-justify-between tw-h-14 tw-shadow-lg'>
      <Text text='Logo' />
      {isFetched && renderUserStatus()}
      <Button {...triggerProps} buttonRef={ref}>
        {label}
      </Button>
    </nav>
  )
}
export default NavBar
