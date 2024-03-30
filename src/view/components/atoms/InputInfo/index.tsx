/* eslint-disable react-refresh/only-export-components */
import { memo } from 'react'
import Text from '../Text'

const Variant = {
  Label: 'label',
  Error: 'error',
} as const

interface Props {
  variant?: keyof typeof Variant
  text?: string
  isRequired?: boolean
  className?: string
}

function InputInfo(props: Props) {
  const { variant = 'Label', text = '', isRequired, className } = props
  const isLabel = variant === 'Label'

  return (
    <Text
      text={isRequired ? `${text} *` : text}
      className={className}
      as={isLabel ? 'label' : 'span'}
      color={isLabel ? 'Default' : 'Red'}
      size={isLabel ? 'Default' : 'Small'}
      attributes={isLabel ? { 'aria-label': `label ${text}` } : {}}
    />
  )
}

export default memo(InputInfo)
