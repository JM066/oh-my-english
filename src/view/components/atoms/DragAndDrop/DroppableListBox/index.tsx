import { useRef } from 'react'
import {
  type SelectionMode,
  type CollectionChildren,
  type DroppableCollectionInsertDropEvent,
} from '@react-types/shared'

import { useDroppableCollectionState, useListState } from 'react-stately'
import {
  ListDropTargetDelegate,
  ListKeyboardDelegate,
  mergeProps,
  useDroppableCollection,
  useListBox,
} from 'react-aria'
import DropOption from '../DropOption'

interface Props<T> {
  children?: CollectionChildren<T>
  selectionManager: SelectionMode
  acceptedDragTypes: 'all' | Array<string | symbol>
  onInsert: (e: DroppableCollectionInsertDropEvent) => void
}

function DroppableListBox<T extends object>(props: Props<T>) {
  const state = useListState(props)
  const ref = useRef(null)
  const { listBoxProps } = useListBox(
    {
      'aria-label': 'droppable list box',
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
    <ul {...mergeProps(listBoxProps, collectionProps)} ref={ref}>
      {[...state.collection].map((item) => (
        <DropOption key={item.key} item={item} state={state} dropState={dropState} />
      ))}
    </ul>
  )
}
DroppableListBox.whyDidYouRender = true
export default DroppableListBox
