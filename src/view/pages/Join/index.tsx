import { useAppSelector } from '../../../stores/appStore'
import Login from '../../components/organisms/Login'
import SignUp from '../SignUp'

function Join(): JSX.Element {
  // Todo : Refctore Login & SignUp and styling
  const { data } = useAppSelector((state) => state.auth)
  const isLoggedIn = data?.userId != null
  return (
    <div>
      <Login isLoggedIn={isLoggedIn} user={data} />
      {!isLoggedIn && <SignUp />}
    </div>
  )
}
export default Join
