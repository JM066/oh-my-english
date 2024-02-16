import { type ReactNode } from 'react'
import { useProgressBar, type AriaProgressBarProps } from 'react-aria'
import { twMerge } from '../../../../utils/tailwind'

const Height = {
  Default: 'tw-h-1',
  Medium: 'tw-h-2',
} as const

const Color = {
  Primary: 'tw-bg-bprimary',
  Secondary: 'tw-bg-bsecondary',
  Success: 'tw-bg-green-500',
  Danger: 'tw-bg-rose-500',
  Default: 'tw-bg-gray-300',
} as const

interface Props {
  label?: ReactNode
  value: number
  minValue: number
  maxValue: number
  options?: AriaProgressBarProps
  showValueLabel?: boolean
  color?: keyof typeof Color
  height?: keyof typeof Height
  labelClassName?: string
}
function ProgressBar(props: Props): JSX.Element {
  const {
    label,
    showValueLabel = !!label,
    options,
    value,
    minValue = 0,
    maxValue = 100,
    color = 'Default',
    height = 'Default',
    labelClassName,
  } = props

  const { progressBarProps, labelProps } = useProgressBar({
    ...options,
    label,
    value,
    minValue,
    maxValue,
  })

  const percentage = (value - minValue) / (maxValue - minValue)
  const barWidth = `${Math.round(percentage * 100)}%`
  return (
    <div {...progressBarProps}>
      <div className={twMerge('tw-bg-gray-300 tw-w-full', Height[height])}>
        <div className={twMerge(Color[color], Height[height])} style={{ width: barWidth }} />
      </div>
      <div className={twMerge('tw-flex tw-items-center tw-justify-between', labelClassName)}>
        {label && <span {...labelProps}>{label}</span>}
        {showValueLabel && <span>{progressBarProps['aria-valuetext']}</span>}
      </div>
    </div>
  )
}
ProgressBar.whyDidYouRender = true
export default ProgressBar
