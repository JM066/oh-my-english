import { useRef } from 'react'
import {
  type SelectionMode,
  type CollectionChildren,
  DroppableCollectionReorderEvent,
  Key,
} from '@react-types/shared'

import {
  useDraggableCollectionState,
  useDroppableCollectionState,
  useListState,
} from 'react-stately'
import {
  ListDropTargetDelegate,
  ListKeyboardDelegate,
  mergeProps,
  useDraggableCollection,
  useDroppableCollection,
  useListBox,
  type AriaListBoxProps,
} from 'react-aria'
import ReorderableOption from '../ReorderableOption'

interface Props<T> {
  children?: CollectionChildren<T>
  selectionManager: SelectionMode
  acceptedDragTypes: 'all' | Array<string | symbol>
  items: Iterable<T>
  onReorder: (e: DroppableCollectionReorderEvent) => void
  options?: Omit<AriaListBoxProps<T>, 'children'>
  removeItem: (item: Key) => void
}

function DroppableListBox<T extends object>({ removeItem, ...props }: Props<T>) {
  const state = useListState<T>(props)
  const ref = useRef(null)
  const { listBoxProps } = useListBox(
    {
      'aria-label': 'droppable list box',
      shouldSelectOnPressUp: true,
      ...props,
    },
    state,
    ref,
  )

  const dropState = useDroppableCollectionState({
    ...props,
    collection: state.collection,
    selectionManager: state.selectionManager,
  })

  const dragState = useDraggableCollectionState({
    ...props,
    collection: state.collection,
    selectionManager: state.selectionManager,
    getItems(keys) {
      return [...keys].map((key) => {
        const item = state.collection.getItem(key)
        return {
          'text/plain': item?.textValue ?? '',
        }
      })
    },
  })

  useDraggableCollection(props, dragState, ref)

  const { collectionProps } = useDroppableCollection(
    {
      ...props,
      keyboardDelegate: new ListKeyboardDelegate(state.collection, state.disabledKeys, ref),
      dropTargetDelegate: new ListDropTargetDelegate(state.collection, ref),
    },
    dropState,
    ref,
  )
  const onDelete = (key: Key) => {
    return function () {
      removeItem(key)
    }
  }

  return (
    <ul
      {...mergeProps(listBoxProps, collectionProps)}
      ref={ref}
      className='tw-flex tw-gap-4 tw-list-none'
    >
      {[...state.collection].map((item) => {
        return (
          <ReorderableOption
            key={item.key}
            item={item}
            state={state}
            dragState={dragState}
            dropState={dropState}
            onDelete={onDelete(item.key)}
          />
        )
      })}
    </ul>
  )
}
DroppableListBox.whyDidYouRender = true
export default DroppableListBox
