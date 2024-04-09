/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import { useRef, type RefObject, type ReactNode } from 'react'
import { useButton, type AriaButtonOptions } from 'react-aria'
import { twMerge } from '../../../../utils/tailwind'

export const Theme = {
  Default:
    'tw-text-white tw-bg-bprimary tw-border tw-border-solid tw-border-bprimary hover:tw-text-white',
  Inverted:
    'tw-text-bprimary tw-bg-white tw-border tw-border-solid tw-border-bprimary hover:tw-text-bprimary',
  Custom: '',
  Ghost: 'tw-border-none tw-bg-transparent tw-outline-none',
  Clean: 'tw-bg-white tw-border tw-border-solid tw-border-gray-200',
} as const

export const Shape = {
  Default: 'tw-rounded-md',
  None: 'tw-rounded-none',
  RoundedLg: 'tw-rounded-lg',
  RoundedXl: 'tw-rounded-xl',
  RoundedFull: 'tw-rounded-full',
} as const

export const Size = {
  Custom: '',
  XSmallSquared: 'tw-h-8 tw-w-8',
  SmallSquared: 'tw-h-10 tw-w-10',
  Squared: 'tw-h-11 tw-w-11',
  LargeSquared: 'tw-h-18 tw-w-18',
  XSmall: 'tw-h-8 tw-w-16',
  Small: 'tw-h-10 tw-w-22',
  Medium: 'tw-h-10 tw-w-40',
  Large: 'tw-h-12 tw-w-64',
  Expand: 'tw-h-10 tw-w-full',
  Full: 'tw-w-full tw-h-full',
} as const

export interface Props extends AriaButtonOptions<'button'> {
  children?: ReactNode
  className?: string
  theme?: keyof typeof Theme
  shape?: keyof typeof Shape
  size?: keyof typeof Size
  type?: 'button' | 'submit' | 'reset'
  isLoading?: boolean
  isDisabled?: boolean
  buttonRef?: RefObject<HTMLButtonElement>
}

function Button(props: Props): JSX.Element {
  const {
    children,
    className,
    theme = 'Default',
    shape = 'Default',
    size = 'Custom',
    isLoading = false,
    isDisabled = false,
    buttonRef,
  } = props

  const ref = useRef(null)
  const { buttonProps } = useButton(props, buttonRef ?? ref)

  const classNames: string = twMerge(
    Theme[theme],
    Shape[shape],
    Size[size],
    isDisabled ? '' : 'tw-cursor-pointer',
    'tw-flex tw-flex-col tw-items-center tw-justify-center',
    className,
  )

  return (
    <button ref={ref} {...buttonProps} className={classNames}>
      {isLoading ? <div className='loader'> </div> : children}
    </button>
  )
}

Button.whyDidYouRender = true
export default Button
