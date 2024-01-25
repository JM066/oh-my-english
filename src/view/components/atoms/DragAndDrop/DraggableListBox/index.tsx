import { useRef } from 'react'
import { type SelectionMode, type CollectionChildren } from '@react-types/shared'

import { useDraggableCollectionState, useListState } from 'react-stately'
import { useDraggableCollection, useListBox, type AriaListBoxProps } from 'react-aria'

import DragOption from '../DragOption'

type DropOperation = 'copy' | 'link' | 'move' | 'cancel'
interface Props<T> {
  children: CollectionChildren<T>
  selectionManager: SelectionMode
  getAllowedDropOperations: () => DropOperation[]
  options?: Omit<AriaListBoxProps<T>, 'children'>
}

function DraggableListBox<T extends object>(props: Props<T>) {
  const { children, options } = props
  const state = useListState({ children, ...options })
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
        return {
          'text/plain': item?.textValue ?? '',
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
