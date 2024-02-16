import { twMerge } from '../../../../utils/tailwind'

export const Variant = {
  Default: 'default',
  Description: 'description',
} as const

export interface Props {
  variant?: keyof typeof Variant
  containerClass?: string
  imageClass?: string
  descriptionClass?: string
}

function LoadingCard(props: Props): JSX.Element {
  const { variant = 'Default', containerClass, imageClass, descriptionClass } = props
  return (
    <div className={twMerge('is-loading', containerClass)}>
      <div className={twMerge('image', imageClass)} />
      {variant === 'Description' && (
        <span className={descriptionClass}>
          <p />
          <p />
        </span>
      )}
    </div>
  )
}

LoadingCard.whyDidYouRender = true
export default LoadingCard
