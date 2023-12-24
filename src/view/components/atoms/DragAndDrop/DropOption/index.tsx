import { useRef } from 'react'
import { mergeProps, useDroppableItem, useFocusRing, useOption } from 'react-aria'
import { type ListState } from '@react-stately/list'
import { type DroppableCollectionState } from '@react-stately/dnd'
import { type Node } from '@react-types/shared'

interface Props<T> {
  item: Node<T>
  state: ListState<T>
  dropState: DroppableCollectionState
}

function DropOption<T>({ item, state, dropState }: Props<T>) {
  const ref = useRef(null)
  const { optionProps } = useOption({ 'aria-label': 'drop option', key: item.key }, state, ref)
  const { isFocusVisible, focusProps } = useFocusRing()

  const { dropProps, isDropTarget } = useDroppableItem(
    {
      target: {
        type: 'item',
        key: item.key,
        dropPosition: 'on',
      },
    },
    dropState,
    ref,
  )
  return (
    <li
      {...mergeProps(optionProps, dropProps, focusProps)}
      ref={ref}
      className={`option ${isFocusVisible ? 'focus-visible' : ''} ${
        isDropTarget ? 'drop-target' : ''
      }`}
    >
      {item.rendered}
    </li>
  )
}
export default DropOption
