import { memo } from 'react'
import { twMerge } from '../../../../utils/tailwind'

export const Color = {
  Custom: '',
  Gray800: 'tw-text-gray-800',
  Gray700: 'tw-text-gray-700',
  Gray500: 'tw-text-gray-700',
  Default: 'tw-text-black',
  White: 'tw-text-white',
  Blue: 'tw-text-blue-700',
  Red: 'tw-text-red-500',
} as const

export const Size = {
  Custom: '',
  XSmall: 'tw-text-xs',
  Small: 'tw-text-sm',
  Default: 'tw-text-base',
  Large: 'tw-text-lg',
  XLarge: 'tw-text-xl',
  XXLarge: 'tw-text-2xl',
  XXXLarge: 'tw-text-3xl',
  XXXXLarge: 'tw-text-4xl',
} as const

export const Boldness = {
  Light: 'tw-font-light',
  Normal: 'tw-font-normal',
  Medium: 'tw-font-medium',
  Semibold: 'tw-font-semibold',
  Bold: 'tw-font-bold',
} as const

export const Transform = {
  Normal: 'tw-normal-case',
  Upper: 'tw-uppercase',
  Lower: 'tw-lowercase',
  Capitalize: 'tw-capitalize',
} as const

export const Decoration = {
  Default: '',
  Underline: 'tw-underline',
  Overline: 'tw-overline',
  Through: 'tw-line-through',
} as const

export interface Props {
  className?: string
  text?: string
  color?: keyof typeof Color
  size?: keyof typeof Size
  boldness?: keyof typeof Boldness
  transform?: keyof typeof Transform
  decoration?: keyof typeof Decoration
  attributes?: React.HTMLAttributes<HTMLElement>
  as?: React.ElementType
}

function Text(props: Props): JSX.Element {
  const {
    className,
    text,
    color = 'Default',
    size = 'Default',
    boldness = 'Normal',
    transform = 'Normal',
    decoration = 'Default',
    attributes,
    as,
  } = props

  const classNames: string = twMerge(
    Color[color],
    Size[size],
    Boldness[boldness],
    Transform[transform],
    Decoration[decoration],
    'tw-m-0',
    className,
  )

  const Component = as || 'span'

  return (
    <Component className={classNames} {...attributes}>
      {text}
    </Component>
  )
}

Text.whyDidYouRender = true
export default memo(Text)
