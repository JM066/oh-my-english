import { useAppSelector } from '../../../stores/appStore'
import Login from '../../components/molecules/Login'

function Join(): JSX.Element {
  // Todo : Refctore Login & SignUp and styling
  const { data, isLoggedIn } = useAppSelector((state) => state.auth)
  return (
    <div>
      <Login isLoggedIn={isLoggedIn} user={data} />
    </div>
  )
}
export default Join
