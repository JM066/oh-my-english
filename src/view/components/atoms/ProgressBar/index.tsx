import { type ReactNode } from 'react'
import { useProgressBar, type AriaProgressBarProps } from 'react-aria'
import { twMerge } from '../../../utils/tailwind'

interface Props {
  label?: ReactNode
  value: number
  minValue: number
  maxValue: number
  options?: AriaProgressBarProps
  showValueLabel?: boolean
}
function ProgressBar(props: Props): JSX.Element {
  const { label, showValueLabel = !!label, options, value, minValue = 0, maxValue = 100 } = props

  const { progressBarProps, labelProps } = useProgressBar({ ...options, value, minValue, maxValue })

  const percentage = (value - minValue) / (maxValue - minValue)
  const barWidth = `${Math.round(percentage * 100)}%`
  return (
    <div
      {...progressBarProps}
      className={twMerge(
        progressBarProps.className,
        // Height[height],
        // Width[width],
        // 'tw-inline-block tw-align-top',
        // className,
      )}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {label && <span {...labelProps}>{label}</span>}
        {showValueLabel && <span>{progressBarProps['aria-valuetext']}</span>}
      </div>
      <div style={{ height: 10, background: 'lightgray' }}>
        <div style={{ width: barWidth, height: 10, background: 'orange' }} />
      </div>
    </div>
  )
}
ProgressBar.whyDidYouRender = true
export default ProgressBar
