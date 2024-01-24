import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Item, useListData } from 'react-stately'
import { type DroppableCollectionInsertDropEvent } from '@react-types/shared'
import useFetchTests from '../../hooks/api/useFetchTests'
import LoadingCard from '../../components/atoms/LoadingCard'
import ProgressBar from '../../components/atoms/ProgressBar'
import Text from '../../components/atoms/Text'
import Button from '../../components/atoms/Button'
import DraggableListBox from '../../components/atoms/DragAndDrop/DraggableListBox'
import DroppableListBox from '../../components/atoms/DragAndDrop/DroppableListBox'

interface ListItem {
  id: number
  name: string
}

function Test(): JSX.Element | null {
  const { id } = useParams()
  const [current, setCurrent] = useState<number>(0)
  const { tests, isLoading } = useFetchTests(id)

  const list = useListData({
    initialItems: [{ id: 1, name: 'Cat' }],
  })
  useEffect(() => {
    console.log('kust', list)
  }, [list])

  const dragItems = tests?.[current].words.concat(tests[current].distractors)

  if (!tests) return null

  const onInsert = async (e: DroppableCollectionInsertDropEvent) => {
    const name = await e.items[0].getText('text/plain')
    console.log('name', name)
    const item = { id: list.items.length + 1, name }
    console.log('item', item)
    if (e.target.dropPosition === 'before') {
      list.insertBefore(e.target.key, item)
    } else if (e.target.dropPosition === 'after') {
      list.insertAfter(e.target.key, item)
    }
  }

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
            <DraggableListBox<ListItem>
              selectionManager='single'
              getAllowedDropOperations={() => ['copy']}
            >
              {dragItems.map((item, index) => {
                const key = `${item}_${index}`
                return (
                  <Item key={key} textValue={item}>
                    {item}
                  </Item>
                )
              })}
            </DraggableListBox>
            <DroppableListBox<ListItem>
              selectionManager='single'
              acceptedDragTypes={['text/plain']}
              items={list.items}
              onInsert={onInsert}
            >
              {(item) => <Item>{item.name}</Item>}
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
