import Login from '../../components/organisms/Login'
import SignUp from '../../components/organisms/SignUp'

function Home(): JSX.Element {
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
