import { useRef } from 'react'
import { useDropIndicator } from 'react-aria'

function DropIndicator(props: any) {
  const { dropState } = props
  const ref = useRef(null)
  const { dropIndicatorProps, isHidden, isDropTarget } = useDropIndicator(props, dropState, ref)
  if (isHidden) {
    return null
  }

  return (
    <li
      {...dropIndicatorProps}
      role='option'
      aria-selected
      ref={ref}
      className={`drop-indicator ${isDropTarget ? 'drop-target' : ''}`}
    />
  )
}
DropIndicator.whyDidYouRender = true
export default DropIndicator
