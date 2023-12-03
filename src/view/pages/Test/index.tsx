import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Item } from 'react-stately'
import { type Key } from '@react-types/shared'
import useFetchTests from '../../hooks/api/useFetchTests'
import LoadingCard from '../../components/atoms/LoadingCard'
import ProgressBar from '../../components/atoms/ProgressBar'
import Text from '../../components/atoms/Text'
import Button from '../../components/atoms/Button'
import Dropzone from '../../components/atoms/DragAndDrop/Dropzone'
import ListBox from '../../components/atoms/DragAndDrop/ListBox'

function Test(): JSX.Element | null {
  const { id } = useParams()
  const [current, setCurrent] = useState<number>(0)
  const { tests, isLoading } = useFetchTests(id)

  const dragItems = tests?.[current].words.concat(tests[current].distractors)
  const getItems = (keys: Set<Key>) => {
    console.log(keys)
    return [{ type: '' }]
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
            <ListBox
              onDragEnd={(e) => console.log(e)}
              onDragStart={(e) => console.log(e)}
              onDragMove={(e) => console.log(e)}
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
            </ListBox>
            <Dropzone />
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
