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
import CustomLink from '../../atoms/CustomLink'
import { type LoginValues } from '../../../../types/Auth'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
})

function Login() {
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
    console.log('data', data)
    try {
      const { email, password } = data
      appDispatch(userLogin({ email, password })).then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          reset()
          toast('Logged In!', { duration: 3000 })
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
      <div className='tw-flex tw-flex-col tw-gap-2 tw-py-4'>
        <TextInput<LoginValues>
          name='email'
          label='Email:'
          type='email'
          control={control}
          rules={{ required: true }}
        />
        <TextInput<LoginValues>
          name='password'
          label='Password:'
          type='password'
          control={control}
          rules={{ required: true }}
        />
      </div>
      <div className='tw-flex tw-gap-2 tw-py-2'>
        <Button theme='Inverted' size='Medium' type='submit'>
          <Text as='p' text='Login' />
        </Button>
        <Button theme='Inverted' size='Medium' type='button' onPress={onLogout}>
          <Text as='p' text='Logout' />
        </Button>
      </div>
    </form>
  )
}

Login.whyDidYouRender = true
export default Login
