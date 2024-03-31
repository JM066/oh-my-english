import { useRef, memo } from 'react'
import { useTextField } from 'react-aria'
import { type ControllerRenderProps, type FieldValues, type Path } from 'react-hook-form'

function Input<T extends FieldValues>(props: ControllerRenderProps<T, Path<T>>) {
  const ref = useRef<HTMLInputElement>(null)
  const { inputProps } = useTextField(
    { 'aria-label': `text field${props?.name ? ` ${props?.name}` : ''}`, ...props },
    ref,
  )

  return <input {...inputProps} placeholder={props?.name} />
}
Input.whyDidYouRender = true
export default memo(Input)
