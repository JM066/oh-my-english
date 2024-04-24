import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useErrorBoundary } from 'react-error-boundary'
import TextInput from '../TextInput'
import { useAppDispatch } from '../../../../stores/appStore'
import { userLogin, userLogout } from '../../../../redux/authSlice'
import Button from '../../atoms/Button'
import Text from '../../atoms/Text'
import { type AuthLogin, type LoginValues } from '../../../../types/Auth'
import { useNavigate } from 'react-router-dom'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
})
interface Props {
  isLoggedIn: boolean
  user?: AuthLogin
}
function Login(props: Props) {
  const { isLoggedIn, user } = props
  const navigate = useNavigate()
  const appDispatch = useAppDispatch()
  const { showBoundary } = useErrorBoundary()

  const { handleSubmit, control, reset } = useForm<LoginValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = (data: LoginValues) => {
    try {
      const { email, password } = data
      appDispatch(userLogin({ email, password })).then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          navigate('/test')
        } else {
          showBoundary(action)
        }
      })
    } catch (error: unknown) {
      showBoundary(error)
    }
  }
  const onLogout = async () => {
    try {
      appDispatch(userLogout()).then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          navigate('/')
        }
      })
    } catch (error: unknown) {
      showBoundary(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isLoggedIn ? (
        <Text as='p' size='XLarge' text={user?.displayName || user?.email} />
      ) : (
        <div className='tw-flex tw-flex-col tw-gap-2 tw-py-4'>
          <TextInput<LoginValues>
            name='email'
            label='email'
            type='email'
            control={control}
            rules={{ required: true }}
          />
          <TextInput<LoginValues>
            name='password'
            label='password'
            type='password'
            control={control}
            rules={{ required: true }}
          />
        </div>
      )}
      {!isLoggedIn ? (
        <Button theme='Default' size='Medium' type='submit'>
          <Text as='p' text='Login' />
        </Button>
      ) : (
        <Button theme='Inverted' size='Medium' type='button' onPress={onLogout}>
          <Text as='p' text='Logout' />
        </Button>
      )}
    </form>
  )
}

Login.whyDidYouRender = true
export default Login
