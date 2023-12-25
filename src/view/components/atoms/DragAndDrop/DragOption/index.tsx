import { useRef } from 'react'
import { mergeProps, useDraggableItem, useFocusRing, useOption } from 'react-aria'
import { type ListState } from '@react-stately/list'
import { type DraggableCollectionState } from '@react-stately/dnd'
import { type Node } from '@react-types/shared'

interface Props<T> {
  item: Node<T>
  state: ListState<T>
  dragState: DraggableCollectionState
}

function DragOption<T>({ item, state, dragState }: Props<T>) {
  const ref = useRef(null)
  const { optionProps } = useOption({ 'aria-label': 'drag option', key: item.key }, state, ref)
  const { isFocusVisible, focusProps } = useFocusRing()

  const { dragProps } = useDraggableItem(
    {
      key: item.key,
    },
    dragState,
  )

  return (
    <li
      {...mergeProps(optionProps, dragProps, focusProps)}
      ref={ref}
      className={`option ${isFocusVisible ? 'focus-visible' : ''}`}
    >
      {item.rendered}
    </li>
  )
}
DragOption.whyDidYouRender = true
export default DragOption
