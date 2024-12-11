import { Item, useListData } from 'react-stately'
import type { DroppableCollectionReorderEvent, Key } from 'react-aria'
import { type ListItem } from '../../../../types/Listening'
import DroppableListBox from '../../atoms/DragAndDrop/DroppableListBox'

interface Props {
  item: ListItem[]
}

function TestItem(props: Props) {
  const { item } = props

  const listData = useListData<ListItem>({
    initialItems: item,
  })

  const onReorder = async (e: DroppableCollectionReorderEvent) => {
    if (e.target.dropPosition === 'before') {
      listData.moveBefore(e.target.key, e.keys)
    } else if (e.target.dropPosition === 'after') {
      listData.moveAfter(e.target.key, e.keys)
    }
  }
  const removeItem = (key: Key) => {
    listData.remove(key)
  }
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
TestItem.whyDidYouRender = true
export default TestItem
