import { useRef, type RefObject } from 'react'
import {
  type SelectionMode,
  type Collection,
  type Node,
  type Key,
  type DraggableCollectionStartEvent,
  type DraggableCollectionMoveEvent,
  type DraggableCollectionEndEvent,
  type DragPreviewRenderer,
} from '@react-types/shared'
import { useDraggableCollectionState, useListState } from 'react-stately'
import { useDraggableCollection, useListBox } from 'react-aria'
import Option from '../Option'

type DragItem = {
  type: string
}
type DropOperation = 'copy' | 'link' | 'move' | 'cancel'
interface Props {
  collection: Collection<Node<object>>
  selectionManager: SelectionMode
  getItems: (keys: Set<Key>) => DragItem[]
  onDragStart: (e: DraggableCollectionStartEvent) => void
  onDragMove: (e: DraggableCollectionMoveEvent) => void
  onDragEnd: (e: DraggableCollectionEndEvent) => void
  preview: RefObject<DragPreviewRenderer>
  getAllowedDropOperations: () => DropOperation[]
}

function ListBox(props: Props) {
  // Setup listbox as normal. See the useListBox docs for more details.
  const state = useListState(props)
  const ref = useRef(null)
  const { listBoxProps } = useListBox(
    {
      ...props,
      // Prevent dragging from changing selection.
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
export default ListBox
