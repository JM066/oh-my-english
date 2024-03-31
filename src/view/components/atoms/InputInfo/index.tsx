import { memo } from 'react'
import { useLabel } from 'react-aria'
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
  const { labelProps } = useLabel({ 'aria-label': `label ${text}`, label: text })

  return (
    <Text
      text={isRequired ? `${text} *` : text}
      className={className}
      as={isLabel ? 'label' : 'span'}
      attributes={isLabel ? labelProps : {}}
      color={isLabel ? 'Default' : 'Red'}
      size={isLabel ? 'Default' : 'Small'}
    />
  )
}

export default memo(InputInfo)
