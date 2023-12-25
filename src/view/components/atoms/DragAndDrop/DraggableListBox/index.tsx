import { useRef } from 'react'
import { type SelectionMode, type CollectionChildren } from '@react-types/shared'

import { useDraggableCollectionState, useListState } from 'react-stately'
import { useDraggableCollection, useListBox } from 'react-aria'

import DragOption from '../DragOption'

type DropOperation = 'copy' | 'link' | 'move' | 'cancel'
interface Props<T> {
  children: CollectionChildren<T>
  selectionManager: SelectionMode
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
    getItems(keys) {
      return [...keys].map((key) => {
        const item = state.collection.getItem(key)
        console.log('item', item)
        return {
          'text/plain': item.textValue,
        }
      })
    },
  })

  useDraggableCollection(props, dragState, ref)

  return (
    <ul {...listBoxProps} ref={ref}>
      {[...state.collection].map((item) => (
        <DragOption key={item.key} item={item} state={state} dragState={dragState} />
      ))}
    </ul>
  )
}

DraggableListBox.whyDidYouRender = true
export default DraggableListBox
