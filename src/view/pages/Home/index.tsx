import { useAppSelector } from '../../../stores/appStore'

function Home(): JSX.Element {
  const auth = useAppSelector((state) => state.auth)

  if (auth.isLoggedIn) {
    return <div>{auth.data?.displayName || auth.data?.email}</div>
  }

  // Todo : Refctore Login & SignUp and styling
  return <div>Home</div>
}
export default Home
