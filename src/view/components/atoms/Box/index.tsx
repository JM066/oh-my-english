import { memo, type CSSProperties, type ReactNode } from 'react'

import { twMerge } from '../../../utils/tailwind'

export const Color = {
  Primary: 'tw-gray-',
  Black: 'tw-border-black',
  White: 'tw-border-white',
  Default: 'tw-border-gray-300',
} as const

export const BackgroundColor = {
  Primary: 'tw-bg-primary-60',
  Secondary: 'tw-bg-primary-60',
  Tertiary: 'tw-bg-tertiary-60',
  Quanternary: 'tw-bg-quanternary-60',
  Default: 'tw-bg-white',
  Custom: '',
} as const

export const Border = {
  Custom: 'tw-border-none',
  Default: 'tw-border',
  Left: 'tw-border-0 tw-border-l',
  Right: 'tw-border-0 tw-border-r',
  Bottom: 'tw-border-0 tw-border-b',
  Top: 'tw-border-0 tw-border-t',
} as const

export const Radius = {
  Custom: '',
  Small: 'tw-rounded-sm',
  Medium: 'tw-rounded-md',
  Large: 'tw-rounded-lg',
} as const

export interface Props {
  color?: keyof typeof Color
  backgroundColor?: keyof typeof BackgroundColor
  radius?: keyof typeof Radius
  border?: keyof typeof Border
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

function Box(props: Props): JSX.Element {
  const {
    color = 'Default',
    backgroundColor = 'Default',
    radius = 'Medium',
    border = 'Default',
    children,
    className,
    style,
  } = props

  const classNames: string = twMerge(
    'tw-inline-block tw-border-solid tw-p-2',
    Border[border],
    Color[color],
    BackgroundColor[backgroundColor],
    Radius[radius],
    className,
  )

  return (
    <span className={classNames} style={style}>
      {children}
    </span>
  )
}

Box.whyDidYouRender = true
export default memo(Box)
