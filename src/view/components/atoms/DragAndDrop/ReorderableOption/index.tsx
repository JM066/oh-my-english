import { useRef } from 'react'
import { mergeProps, useDraggableItem, useDroppableItem, useFocusRing, useOption } from 'react-aria'
import { type ListState } from '@react-stately/list'
import { type DraggableCollectionState, type DroppableCollectionState } from '@react-stately/dnd'
import { type Node } from '@react-types/shared'
import DropIndicator from '../DropIndicator'
import Text from '../../Text'
import Button from '../../Button'

interface Props<T> {
  item: Node<T>
  state: ListState<T>
  dragState: DraggableCollectionState
  dropState: DroppableCollectionState
  onDelete: () => void
}

function ReorderableOption<T>({ item, state, dragState, dropState, onDelete }: Props<T>) {
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
  const { dragProps } = useDraggableItem(
    {
      key: item.key,
    },
    dragState,
  )

  return (
    <>
      <DropIndicator
        target={{
          type: 'item',
          key: item.key,
          dropPosition: 'before',
        }}
        dropState={dropState}
      />
      <li
        {...mergeProps(optionProps, dropProps, dragProps, focusProps)}
        ref={ref}
        className={`option ${isFocusVisible ? 'focus-visible' : ''} ${
          isDropTarget ? 'drop-target' : ''
        } tw-relative tw-bg-white tw-border tw-border-solid tw-rounded-md tw-flex tw-flex-col tw-text-center tw-p-2`}
      >
        <Text text={item.rendered?.toString()} />
        <Button onPress={onDelete} theme='Ghost' className='tw-absolute tw-right-0 tw-bottom-0'>
          X
        </Button>
      </li>
      {state.collection.getKeyAfter(item.key) == null && (
        <DropIndicator
          target={{
            type: 'item',
            key: item.key,
            dropPosition: 'after',
          }}
          dropState={dropState}
        />
      )}
    </>
  )
}
ReorderableOption.whyDidYouRender = true
export default ReorderableOption
