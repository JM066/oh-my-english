import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ListItem, type ListeningTest } from '../../../../types/Listening'
import { Item, useListData } from 'react-stately'
import { DroppableCollectionInsertDropEvent, TextDropItem } from 'react-aria'
import ProgressBar from '../../atoms/ProgressBar'
import Text from '../../atoms/Text'
import Button from '../../atoms/Button'
import DraggableListBox from '../../atoms/DragAndDrop/DraggableListBox'
import { addItems, shuffle } from '../../../../utils/arrayOperations'
import DroppableListBox from '../../atoms/DragAndDrop/DroppableListBox'

interface Props {
  item: ListItem[]
  isVisible?: boolean
}

function TestItem(props: Props) {
  const { item, isVisible } = props

  const listData = useListData<ListItem>({
    initialItems: item,
  })
  console.log('listData', listData)
  if (!isVisible) return null

  const onInsert = async (e: DroppableCollectionInsertDropEvent) => {
    const firstItem = e.items[0]
    if ('getText' in firstItem) {
      const textDropItem = firstItem as TextDropItem
      const name = await textDropItem.getText('text/plain')
      const newItem = { id: listData.items.length + 1, name }
      if (e.target.dropPosition === 'before') {
        listData.insertBefore(e.target.key, newItem)
      } else if (e.target.dropPosition === 'after') {
        listData.insertAfter(e.target.key, newItem)
      }
    }
  }

  //   const shuffledItems = shuffle(addItems(item.words, item.distractors))
  return (
    <div className=''>
      {/* <Text text={item?.answerKr} /> */}
      {/* <DraggableListBox<ListItem>
        selectionManager='single'
        getAllowedDropOperations={() => ['copy']}
      >
        {shuffledItems.map((item, idx) => {
          const key = `${item}_${idx}`
          return (
            <Item key={key} textValue={item}>
              {item}
            </Item>
          )
        })}
      </DraggableListBox> */}
      <DroppableListBox<ListItem>
        selectionManager='single'
        acceptedDragTypes={['text/plain']}
        items={listData.items}
        onInsert={onInsert}
      >
        {(item) => <Item>{item.name}</Item>}
      </DroppableListBox>
    </div>
  )
}
TestItem.whyDidYouRender = true
export default TestItem
