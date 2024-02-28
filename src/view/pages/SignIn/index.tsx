import Login from '../../components/organisms/Login'
import SignUp from '../../components/organisms/SignUp'

function SignIn(): JSX.Element {
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
export default SignIn
