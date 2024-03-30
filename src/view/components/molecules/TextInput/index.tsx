import { type FieldValues, useController, type UseControllerProps } from 'react-hook-form'
import InputInfo from '../../atoms/InputInfo'

interface Props {
  label?: string
  type?: string
  id?: string
}
function TextInput<T extends FieldValues>(props: Props & UseControllerProps<T>) {
  const { label, name, control, rules } = props
  const { field, fieldState } = useController({ name, control, rules })
  return (
    <>
      <InputInfo text={label} className='self-start' />
      <input {...field} placeholder={props?.name} />
      <p>{fieldState.invalid ? 'invalid' : 'valid'}</p>
      <InputInfo text={fieldState?.error?.message} variant='Error' className='h-7 self-end' />
    </>
  )
}

TextInput.whyDidYouRender = true
export default TextInput
