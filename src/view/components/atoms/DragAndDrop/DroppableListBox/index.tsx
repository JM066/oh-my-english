import { useRef } from 'react'
import {
  type SelectionMode,
  type CollectionChildren,
  type DroppableCollectionInsertDropEvent,
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
import DropOption from '../DropOption'

interface Props<T> {
  children?: CollectionChildren<T>
  selectionManager: SelectionMode
  acceptedDragTypes: 'all' | Array<string | symbol>
  items: Iterable<T>
  onInsert: (e: DroppableCollectionInsertDropEvent) => void
  options?: Omit<AriaListBoxProps<T>, 'children'>
}

function DroppableListBox<T extends object>(props: Props<T>) {
  const { items, options } = props
  const state = useListState<T>({ items, ...options })
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
  return (
    <ul
      {...mergeProps(listBoxProps, collectionProps)}
      ref={ref}
      className='tw-flex tw-gap-2 tw-h-6 tw-bg-slate-300 tw-list-none'
    >
      {[...state.collection].map((item) => (
        <DropOption
          key={item.key}
          item={item}
          state={state}
          dragState={dragState}
          dropState={dropState}
        />
      ))}
    </ul>
  )
}
DroppableListBox.whyDidYouRender = true
export default DroppableListBox
