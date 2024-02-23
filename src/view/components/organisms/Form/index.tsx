/* eslint-disable import/no-extraneous-dependencies */
import { useForm } from 'react-hook-form'
import { Button } from 'react-aria-components'
import toast from 'react-hot-toast'
import { useErrorBoundary } from 'react-error-boundary'
import TextInput from '../../molecules/TextInput'
import { useAppDispatch } from '../../../../stores/appStore'
import { type User } from '../../../../types/Auth'
import { userLogin } from '../../../../redux/authSlice'

function Form() {
  const appDispatch = useAppDispatch()
  const { showBoundary } = useErrorBoundary()

  const { handleSubmit, control } = useForm<User>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = async (data: User) => {
    try {
      const { email, password } = data
      appDispatch(userLogin({ email, password })).then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          toast.success('toast.reset.password.success', { duration: 1000 })
        }
        showBoundary(action)
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

Form.whyDidYouRender = true
export default Form
