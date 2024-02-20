import { memo } from 'react'

import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form'
import { Input, Label, TextField, FieldError } from 'react-aria-components'
import Text from '../../atoms/Text'

export interface Props<T> {
  control: Control<FieldValues, T>
  label: Path<T>
}

function TextInput<T>({ control, label }: Props<T>) {
  return (
    <Controller
      control={control}
      name={label}
      rules={{ required: `${label} is required` }}
      render={({
        field: { name, value, onChange, onBlur, ref },
        fieldState: { invalid, error },
      }) => (
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
            <Text text={error?.message} color='Red' />
          </FieldError>
        </TextField>
      )}
    />
  )
}

TextInput.whyDidYouRender = true
export default memo(TextInput)
