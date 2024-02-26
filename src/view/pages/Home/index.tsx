import { useAppSelector } from '../../../stores/appStore'
import Login from '../../components/organisms/Login'
import SignUp from '../../components/organisms/SignUp'

function Home(): JSX.Element {
  const { auth } = useAppSelector((state) => state)
  if (auth.isLoggedIn) {
    return <div>{auth.data?.displayName || auth.data?.email}</div>
  }
  // Todo : Refctore Login & SignUp and styling
  return (
    <div>
      <h2>Login</h2>
      <Login />
      <h2>SignUp</h2>
      <SignUp />
    </div>
  )
}
export default Home
