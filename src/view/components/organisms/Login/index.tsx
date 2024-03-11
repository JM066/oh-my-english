/* eslint-disable import/no-extraneous-dependencies */
import { useForm } from 'react-hook-form'
// import { Button } from 'react-aria-components'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useErrorBoundary } from 'react-error-boundary'
import TextInput from '../../molecules/TextInput'
import { useAppDispatch } from '../../../../stores/appStore'
import { userLogin, userLogout } from '../../../../redux/authSlice'
import Button from '../../atoms/Button'
import Text from '../../atoms/Text'

export const schema = yup.object({
  displayName: yup.string(),
  email: yup.string().email().required('Email address required'),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
})
export type LoginInfo = yup.InferType<typeof schema>

function Login() {
  const appDispatch = useAppDispatch()
  const { showBoundary } = useErrorBoundary()

  const { handleSubmit, control } = useForm<LoginInfo>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = async (data: LoginInfo) => {
    try {
      const { email, password } = data
      appDispatch(userLogin({ email, password })).then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
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
      <Button theme='Ghost'>
        <Text as='p' color='Gray500' decoration='Underline' text="Haven't signed up yet?" />
      </Button>
      <div className='tw-flex tw-flex-col tw-gap-2 tw-py-4'>
        <TextInput type='email' name='email' label='Email:' control={control} />
        <TextInput type='password' name='password' label='Password:' control={control} />
      </div>

      <div className='tw-flex tw-gap-2 tw-py-2'>
        <Button isDisabled theme='Inverted' size='Medium' type='submit'>
          <Text as='p' text='Login' />
        </Button>
        <Button theme='Inverted' size='Medium' type='submit' onPress={onLogout}>
          <Text as='p' text='Logout' />
        </Button>
      </div>
    </form>
  )
}

Login.whyDidYouRender = true
export default Login
