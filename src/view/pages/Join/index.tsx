import { useAppSelector } from '../../../stores/appStore'
import Login from '../../components/organisms/Login'

function Join(): JSX.Element {
  // Todo : Refctore Login & SignUp and styling
  const { data } = useAppSelector((state) => state.auth)
  const isLoggedIn = data?.userId != null
  return (
    <div>
      <Login isLoggedIn={isLoggedIn} user={data} />
    </div>
  )
}
export default Join
