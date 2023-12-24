import { useRef } from 'react'
import {
  type SelectionMode,
  type Key,
  type DragItem,
  type CollectionChildren,
} from '@react-types/shared'

import { useDraggableCollectionState, useListState } from 'react-stately'
import { useDraggableCollection, useListBox } from 'react-aria'

import Option from '../DragOption'

type DropOperation = 'copy' | 'link' | 'move' | 'cancel'
interface Props<T> {
  children: CollectionChildren<T>
  selectionManager: SelectionMode
  getItems: (keys: Set<Key>) => DragItem[]
  getAllowedDropOperations: () => DropOperation[]
}

function DraggableListBox<T extends object>(props: Props<T>) {
  const state = useListState(props)
  const ref = useRef(null)

  const { listBoxProps } = useListBox(
    {
      'aria-label': 'draggable list box',
      ...props,
      shouldSelectOnPressUp: true,
    },
    state,
    ref,
  )

  const dragState = useDraggableCollectionState({
    ...props,
    collection: state.collection,
    selectionManager: state.selectionManager,
    getItems:
      props?.getItems ||
      ((keys) => {
        return [...keys].map((key) => {
          const item = state.collection.getItem(key)
          return {
            'text/plain': item?.textValue,
          }
        })
      }),
  })

  useDraggableCollection(props, dragState, ref)

  return (
    <ul {...listBoxProps} ref={ref}>
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} dragState={dragState} />
      ))}
    </ul>
  )
}

DraggableListBox.whyDidYouRender = true
export default DraggableListBox
