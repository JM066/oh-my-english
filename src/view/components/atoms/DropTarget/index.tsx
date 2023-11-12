import { useState, useRef } from 'react'
import { type TextDropItem } from 'react-aria'

import { useDrop } from 'react-aria'

function DropTarget() {
  const [dropped, setDropped] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const { dropProps, isDropTarget } = useDrop({
    ref,
    async onDrop(e) {
      const items = await Promise.all(
        e.items
          .filter(
            (item): item is TextDropItem => item.kind === 'text' && item.types.has('text/plain'),
          )
          .map((item) => item?.getText('text/plain')),
      )
      setDropped(items.join('\n'))
    },
  })

  return (
    <div
      {...dropProps}
      role='button'
      tabIndex={0}
      ref={ref}
      className={`droppable ${isDropTarget ? 'target' : ''}`}
    >
      {dropped || 'Drop here'}
    </div>
  )
}

export default DropTarget
