import { useRef, memo } from 'react'
import type { AriaTextFieldProps } from 'react-aria'
import { useTextField } from 'react-aria'

function Input(props: AriaTextFieldProps) {
  const { label, description } = props
  const ref = useRef(null)
  const {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationErrors,
  } = useTextField(props, ref)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label {...labelProps}>{label}</label>
      <input {...inputProps} ref={ref} />
      {description && (
        <div {...descriptionProps} style={{ fontSize: 12 }}>
          {description}
        </div>
      )}
      {isInvalid && (
        <div {...errorMessageProps} style={{ color: 'red', fontSize: 10 }}>
          {validationErrors.join(' ')}
        </div>
      )}
    </div>
  )
}

Input.whyDidYouRender = true
export default memo(Input)
