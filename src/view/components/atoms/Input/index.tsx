import { memo, forwardRef } from 'react'
import { useTextField, useObjectRef } from 'react-aria'
import { type ControllerRenderProps, type FieldValues, type Path } from 'react-hook-form'

const Input = forwardRef(
  <T extends FieldValues>(
    props: ControllerRenderProps<T, Path<T>>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const objRef = useObjectRef(ref)
    const { inputProps } = useTextField(
      { 'aria-label': `text field${props?.name ? ` ${props?.name}` : ''}`, ...props },
      objRef,
    )

    return <input ref={ref} {...inputProps} placeholder={props?.name} />
  },
)

Input.displayName = 'Input'
Input.whyDidYouRender = true
export default memo(Input)
