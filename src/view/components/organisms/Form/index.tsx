import { useForm, type FieldValues } from 'react-hook-form'
import { Button } from 'react-aria-components'
import TextInput from '../../molecules/TextInput'

function Form() {
  const { handleSubmit, control } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
    },
  })
  const onSubmit = (data: FieldValues) => {
    console.log('data', data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput control={control} label='name' />
      <TextInput control={control} label='email' />
      <Button type='submit'>Submit</Button>
    </form>
  )
}

Form.whyDidYouRender = true
export default Form
