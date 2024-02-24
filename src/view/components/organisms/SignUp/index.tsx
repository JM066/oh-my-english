/* eslint-disable import/no-extraneous-dependencies */
import { useForm } from 'react-hook-form'
import { Button } from 'react-aria-components'
import toast from 'react-hot-toast'
import { useErrorBoundary } from 'react-error-boundary'
import TextInput from '../../molecules/TextInput'
import { useAppDispatch } from '../../../../stores/appStore'
import { type SignUpInfo } from '../../../../types/Auth'
import { userSignUp } from '../../../../redux/authSlice'

function SignUp() {
  const appDispatch = useAppDispatch()
  const { showBoundary } = useErrorBoundary()

  const { handleSubmit, control } = useForm<SignUpInfo>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })
  const onSubmit = async (data: SignUpInfo) => {
    try {
      const { email, password, name } = data
      appDispatch(userSignUp({ email, password, name })).then((action) => {
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
      <TextInput type='email' name='email' label='email' control={control} />
      <TextInput type='password' name='password' label='password' control={control} />
      <TextInput type='name' name='name' label='name' control={control} />
      <Button type='submit'>Submit</Button>
    </form>
  )
}

SignUp.whyDidYouRender = true
export default SignUp
