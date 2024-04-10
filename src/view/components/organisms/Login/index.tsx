/* eslint-disable import/no-extraneous-dependencies */

import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useErrorBoundary } from 'react-error-boundary'
import TextInput from '../../molecules/TextInput'
import { useAppDispatch } from '../../../../stores/appStore'
import { userLogin, userLogout } from '../../../../redux/authSlice'
import Button from '../../atoms/Button'
import Text from '../../atoms/Text'
import { type AuthLogin, type LoginValues } from '../../../../types/Auth'

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
    console.error('data', data)
    try {
      const { email, password } = data
      appDispatch(userLogin({ email, password })).then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          toast('Logged In!', { duration: 3000 })
          reset()
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
          toast.success('success!', { duration: 1000 })
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
      <Button
        theme='Inverted'
        size='Medium'
        type={isLoggedIn ? 'button' : 'submit'}
        onPress={onLogout}
      >
        <Text as='p' text={isLoggedIn ? 'Logout' : 'Login'} />
      </Button>
    </form>
  )
}

Login.whyDidYouRender = true
export default Login
