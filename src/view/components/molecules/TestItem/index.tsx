import { ListItem } from '../../../../types/Listening'
import { Item, useListData } from 'react-stately'
import { DroppableCollectionReorderEvent, Key } from 'react-aria'
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
  const removeItem = (item: Key) => {
    listData.remove(item)
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
        {(item) => <Item>{item.name}</Item>}
      </DroppableListBox>
    </div>
  )
}
TestItem.whyDidYouRender = true
export default TestItem
