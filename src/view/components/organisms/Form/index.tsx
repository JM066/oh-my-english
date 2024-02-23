import { useForm } from 'react-hook-form'
import { Button } from 'react-aria-components'
import toast from 'react-hot-toast'
import { FirebaseError } from '@firebase/util'
import TextInput from '../../molecules/TextInput'

import { useAppDispatch } from '../../../../stores/appStore'
import { userLogin } from '../../../../redux/authSlice'
import { type User } from '../../../../types/Auth'

function Form() {
  const appDispatch = useAppDispatch()
  const { handleSubmit, control } = useForm<User>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = (data: User) => {
    try {
      const { email, password } = data
      appDispatch(userLogin({ email, password })).then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          toast.success('toast.reset.password.success', { duration: 1000 })
        }
      })
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.log(error)
        // Todo : ErrorBoundary for async
      }
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
