/* eslint-disable import/no-extraneous-dependencies */
import { useForm } from 'react-hook-form'
import { Button } from 'react-aria-components'
import toast from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import { useErrorBoundary } from 'react-error-boundary'
import TextInput from '../../molecules/TextInput'
import { useAppDispatch } from '../../../../stores/appStore'
import { userSignUp } from '../../../../redux/authSlice'
import { schema, type LoginInfo } from '../Login'

function SignUp() {
  const appDispatch = useAppDispatch()
  const { showBoundary } = useErrorBoundary()
  const { handleSubmit, control } = useForm<LoginInfo>({
    resolver: yupResolver(schema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })
  const onSubmit = async (data: LoginInfo) => {
    try {
      // const { email, password } = data
      appDispatch(userSignUp(data)).then((action) => {
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
      <TextInput type='name' name='displayName' label='name' control={control} />
      <TextInput type='email' name='email' label='email' control={control} />
      <TextInput type='password' name='password' label='password' control={control} />
      <TextInput
        type='password'
        name='passwordConfirmation'
        label='confirm password'
        control={control}
      />
      <Button type='submit'>Submit</Button>
    </form>
  )
}

SignUp.whyDidYouRender = true
export default SignUp
