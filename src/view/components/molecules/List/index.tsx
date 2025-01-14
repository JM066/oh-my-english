import { Item, useListData } from 'react-stately'
import type { DroppableCollectionReorderEvent, Key } from 'react-aria'
import { type ListItem } from '../../../../types/Listening'
import DroppableListBox from '../../atoms/DragAndDrop/DroppableListBox'
import { useCallback } from 'react'

interface Props {
  item: ListItem[]
}

function List(props: Props) {
  const { item } = props

  const listData = useListData({
    initialItems: item,
  })

  const onReorder = useCallback(
    (e: DroppableCollectionReorderEvent) => {
      if (e.target.dropPosition === 'before') {
        listData.moveBefore(e.target.key, e.keys)
      } else if (e.target.dropPosition === 'after') {
        listData.moveAfter(e.target.key, e.keys)
      }
    },
    [listData],
  )
  const removeItem = useCallback(
    (key: Key) => {
      listData.remove(key)
    },
    [listData],
  )
  return (
    <div className=''>
      <DroppableListBox<ListItem>
        selectionManager='single'
        acceptedDragTypes={['text/plain']}
        items={listData.items}
        onReorder={onReorder}
        removeItem={removeItem}
      >
        {(i) => <Item>{i.name}</Item>}
      </DroppableListBox>
    </div>
  )
}
List.whyDidYouRender = true
export default List
