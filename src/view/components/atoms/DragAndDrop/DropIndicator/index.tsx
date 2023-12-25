import { useRef } from 'react'
import { useDropIndicator } from 'react-aria'

function DropIndicator(props: any) {
  const ref = useRef(null)
  const { dropIndicatorProps, isHidden, isDropTarget } = useDropIndicator(
    props,
    props.dropState,
    ref,
  )
  if (isHidden) {
    return null
  }

  return (
    <li
      {...dropIndicatorProps}
      role='option'
      ref={ref}
      className={`drop-indicator ${isDropTarget ? 'drop-target' : ''}`}
    />
  )
}
DropIndicator.whyDidYouRender = true
export default DropIndicator
