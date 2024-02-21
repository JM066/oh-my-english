import { memo, useEffect } from 'react'

import { type UseControllerProps, useController } from 'react-hook-form'
import { Input, Label, TextField, FieldError } from 'react-aria-components'
import Text from '../../atoms/Text'
import { type Login } from '../../../../types/Auth'

export interface Props {
  name: string
  label: string
}

function TextInput<T extends Login>(props: Props & UseControllerProps<T>): JSX.Element {
  // Todo: Need to fix the generic type
  const { name, control, label, rules } = props
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController<T>({ name, control, rules: { ...rules, required: true } })
  console.log('errors', error)

  return (
    <TextField
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      isRequired
      validationBehavior='aria'
      isInvalid={invalid}
    >
      <Label>
        <Text text={label} color='Gray800' />
      </Label>
      <Input ref={ref} />
      <FieldError>
        <Text
          size='Small'
          text={error?.type === 'required' ? '* is Required' : error?.message}
          color='Red'
        />
      </FieldError>
    </TextField>
  )
}

TextInput.whyDidYouRender = true
export default memo(TextInput)
