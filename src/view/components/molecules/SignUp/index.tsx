import { useForm } from 'react-hook-form'
import { Button } from 'react-aria-components'
import toast from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import { useErrorBoundary } from 'react-error-boundary'
import * as yup from 'yup'
import TextInput from '../TextInput'
import { useAppDispatch } from '../../../../stores/appStore'
import { userSignUp } from '../../../../redux/authSlice'
import { type SignUpValues } from '../../../../types/Auth'

const schema = yup.object({
  displayName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

function SignUp() {
  const appDispatch = useAppDispatch()
  const { showBoundary } = useErrorBoundary()
  const { handleSubmit, control, reset } = useForm<SignUpValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })
  const onSubmit = async (data: SignUpValues) => {
    console.log('dada signup', data)
    try {
      appDispatch(userSignUp(data)).then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          toast.success('Signed up', { duration: 1000 })
          reset()
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
      <TextInput<SignUpValues> name='displayName' label='name' type='name' control={control} />
      <TextInput<SignUpValues> name='email' label='email' type='email' control={control} />
      <TextInput<SignUpValues> name='password' label='password' type='password' control={control} />
      <TextInput<SignUpValues>
        name='passwordConfirmation'
        label='confirm password'
        type='password'
        control={control}
      />
      <Button type='submit'>Submit</Button>
    </form>
  )
}

SignUp.whyDidYouRender = true
export default SignUp
