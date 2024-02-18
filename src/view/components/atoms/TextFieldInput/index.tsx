import { useRef, memo } from 'react'
import type { AriaTextFieldOptions } from 'react-aria'
import { useTextField, useLabel } from 'react-aria'
import { type RegisterOptions, useFormContext } from 'react-hook-form'

import Text from '../Text'

export interface Props extends AriaTextFieldOptions<'input'> {
  className?: string
  label?: string
  error?: string
  formOptions?: RegisterOptions
}
function TextFieldInput(props: Props) {
  const { label = '', error = '', placeholder = 'placeholder...' } = props
  const ref = useRef(null)
  const { inputProps, errorMessageProps, validationErrors } = useTextField(props, ref)
  const { labelProps } = useLabel({ 'aria-label': `label ${label}`, label })

  const formContext = useFormContext()

  return (
    <div className='tw-flex tw-flex-col'>
      <Text size='Small' {...labelProps} color='Gray800' as='label' text={label} />
      <input {...inputProps} ref={ref} />
      {/* {...(formContext?.register(label, formOptions) */}
      <Text
        size='Small'
        {...errorMessageProps}
        color='Red'
        as='span'
        text={error || validationErrors.join(' ')}
      />
    </div>
  )
}

TextFieldInput.whyDidYouRender = true
export default memo(TextFieldInput)
