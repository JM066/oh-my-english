import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Item, useListData } from 'react-stately'
import {
  type Key,
  type DragItem,
  type DroppableCollectionInsertDropEvent,
} from '@react-types/shared'
import useFetchTests from '../../hooks/api/useFetchTests'
import LoadingCard from '../../components/atoms/LoadingCard'
import ProgressBar from '../../components/atoms/ProgressBar'
import Text from '../../components/atoms/Text'
import Button from '../../components/atoms/Button'
import DraggableListBox from '../../components/atoms/DragAndDrop/DraggableListBox'
import DroppableListBox from '../../components/atoms/DragAndDrop/DroppableListBox'

function Test(): JSX.Element | null {
  const { id } = useParams()
  const [current, setCurrent] = useState<number>(0)
  const { tests, isLoading } = useFetchTests(id)
  const list = useListData({
    initialItems: [
      { id: 1, name: 'Cat' },
      { id: 2, name: 'Dog' },
      { id: 3, name: 'Kangaroo' },
    ],
  })
  const dragItems = tests?.[current].words.concat(tests[current].distractors)

  const getItems = (keys: Set<Key>) => {
    const items: DragItem[] = []
    keys.forEach((key) => {
      const item: DragItem = {}
      item[key.toString()] = key.toString()
      items.push(item)
    })
    return items
  }
  const onInsert = async (e: DroppableCollectionInsertDropEvent) => {
    const name = await e.items[0]?.getText('text/plain')
    const item = { id: list.items.length + 1, name }
    if (e.target.dropPosition === 'before') {
      list.insertBefore(e.target.key, item)
    } else if (e.target.dropPosition === 'after') {
      list.insertAfter(e.target.key, item)
    }
  }

  if (!tests) return null
  return (
    <div>
      {!isLoading ? (
        dragItems && (
          <>
            <ProgressBar
              label={<Text as='h2' text={`${current + 1}/${tests.length}`} />}
              showValueLabel={false}
              value={current + 1}
              maxValue={tests.length}
              minValue={0}
              color='Success'
              labelClassName='tw-justify-end'
              options={{ 'aria-label': `progress bar ${id}` }}
            />
            <Text text={tests[current].answerKr} />
            <Button
              theme='Inverted'
              onPress={() => setCurrent((prev) => Math.min(prev + 1, tests.length - 1))}
            >
              <Text text='Next' />
            </Button>
            <DraggableListBox
              selectionManager='single'
              getItems={getItems}
              getAllowedDropOperations={() => ['copy']}
            >
              {dragItems.map((item, index) => {
                const key = `${item}_${index}`
                return (
                  <Item key={key} textValue={key}>
                    {item}
                  </Item>
                )
              })}
            </DraggableListBox>
            <DroppableListBox
              selectionManager='single'
              acceptedDragTypes={['text/plain']}
              onInsert={onInsert}
            >
              {(item) => <Item>{item}</Item>}
            </DroppableListBox>
          </>
        )
      ) : (
        <LoadingCard />
      )}
    </div>
  )
}
Test.whyDidYouRender = true
export default Test
