import CustomLink from '../../components/atoms/CustomLink'
import Login from '../../components/organisms/Login'

function SignIn(): JSX.Element {
  // Todo : Refctore Login & SignUp and styling

  return (
    <div>
      <CustomLink path='signup'>Register with us</CustomLink>
      <Login />
    </div>
  )
}
export default SignIn
