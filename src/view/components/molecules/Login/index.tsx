import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useErrorBoundary } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../stores/appStore'
import { userLogin, userLogout } from '../../../../redux/authSlice'
import Button from '../../atoms/Button'
import Text from '../../atoms/Text'
import { type LoginRequest } from '../../../../types/Auth'
import TextInput from '../TextInput'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
})

function Login() {
  const { data: user, isLoggedIn } = useAppSelector((state) => state.auth)

  const navigate = useNavigate()

  const appDispatch = useAppDispatch()
  const { showBoundary } = useErrorBoundary()

  const { handleSubmit, control } = useForm<LoginRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = useCallback(
    async (data: LoginRequest) => {
      try {
        const { email, password } = data
        const action = await appDispatch(userLogin({ email, password }))
        if (action.meta.requestStatus === 'fulfilled') {
          navigate('/listening')
        } else {
          showBoundary(action)
        }
      } catch (error: unknown) {
        showBoundary(error)
      }
    },
    [appDispatch, navigate, showBoundary],
  )

  const onLogout = useCallback(() => {
    appDispatch(userLogout()).catch((error: unknown) => {
      showBoundary(error)
    })
  }, [appDispatch, showBoundary])

  return (
    <div>
      {isLoggedIn && user?.email ? (
        <>
          <Text as='p' size='XLarge' text={`Hi ${user?.displayName ?? user?.email}`} />
          <Button theme='Inverted' size='Medium' type='button' onPress={onLogout}>
            <Text as='p' text='Logout' />
          </Button>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='tw-flex tw-flex-col tw-gap-2 tw-py-4'>
            <TextInput
              name='email'
              label='Email'
              type='email'
              control={control}
              rules={{ required: 'Email is required' }}
            />
            <TextInput
              name='password'
              label='Password'
              type='password'
              control={control}
              rules={{ required: 'Password is required' }}
            />
          </div>

          <Button theme='Default' size='Medium' type='submit'>
            <Text as='p' text='Login' />
          </Button>
        </form>
      )}
    </div>
  )
}

Login.whyDidYouRender = true
export default Login
