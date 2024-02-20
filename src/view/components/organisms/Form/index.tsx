import { useForm } from 'react-hook-form'
import { Button } from 'react-aria-components'
import TextInput from '../../molecules/TextInput'
import authService from '../../../../services/auth'
import { type Login } from '../../../types/User'

function Form() {
  const { handleSubmit, control } = useForm<Login>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = async (data: Login) => {
    const { email, password } = data
    const login = await authService.userLogin()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput control={control} label='email' />
      <TextInput control={control} label='password' />
      <Button type='submit'>Submit</Button>
    </form>
  )
}

Form.whyDidYouRender = true
export default Form
