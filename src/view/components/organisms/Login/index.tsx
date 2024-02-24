/* eslint-disable import/no-extraneous-dependencies */
import { useForm } from 'react-hook-form'
import { Button } from 'react-aria-components'
import toast from 'react-hot-toast'
import { useErrorBoundary } from 'react-error-boundary'
import TextInput from '../../molecules/TextInput'
import { useAppDispatch } from '../../../../stores/appStore'
import { type LoginInfo } from '../../../../types/Auth'
import { userLogin } from '../../../../redux/authSlice'

function Login() {
  const appDispatch = useAppDispatch()
  const { showBoundary } = useErrorBoundary()

  const { handleSubmit, control } = useForm<LoginInfo>({
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
          toast.success('toast.reset.password.success', { duration: 1000 })
        } else {
          showBoundary(action)
        }
      })
    } catch (error: unknown) {
      showBoundary(error)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput name='email' label='email' control={control} />
      <TextInput name='password' label='password' control={control} />
      <Button type='submit'>Submit</Button>
    </form>
  )
}

Login.whyDidYouRender = true
export default Login
