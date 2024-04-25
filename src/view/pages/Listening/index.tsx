import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Item, useListData } from 'react-stately'
import { type DroppableCollectionInsertDropEvent } from '@react-types/shared'
import useFetchListeningTest from '../../hooks/api/useFetchListeningTest'
import LoadingCard from '../../components/atoms/LoadingCard'
import ProgressBar from '../../components/atoms/ProgressBar'
import Text from '../../components/atoms/Text'
import Button from '../../components/atoms/Button'
import DraggableListBox from '../../components/atoms/DragAndDrop/DraggableListBox'
import DroppableListBox from '../../components/atoms/DragAndDrop/DroppableListBox'
import TestItem from '../../components/molecules/TestItem'
import { ListItem, ListeningTest } from '../../../types/Listening'
import { addItems, shuffle } from '../../../utils/arrayOperations'

function Listening(): JSX.Element | null {
  const { id } = useParams()
  const [page, setPage] = useState<number>(0)
  const [current, setCurrent] = useState<ListeningTest>()
  const [dragItems, setDragItems] = useState<string[]>()
  const { testItems, isLoading } = useFetchListeningTest(id)
  console.error('result', testItems)

  useEffect(() => {
    setPage(0)
  }, [testItems, isLoading])

  if (!testItems) return null

  const onNext = () => {
    setPage((prev) => Math.min(prev + 1, testItems.length - 1))
  }
  const shuffledItems = shuffle(addItems(testItems[page]?.words, testItems[page]?.distractors))
  const createList = (): ListItem[] => {
    console.error('shuffledItems', shuffledItems)
    return shuffledItems?.map((item, idx) => {
      return {
        id: idx,
        name: item,
      }
    })
  }
  console.log('createList', createList())
  return (
    <div className=''>
      {!isLoading && (
        <>
          <ProgressBar
            label={<Text as='h2' text={`${page + 1}/${testItems.length}`} />}
            showValueLabel={false}
            value={page + 1}
            maxValue={testItems.length}
            minValue={0}
            color='Success'
            labelClassName='tw-justify-end'
            options={{ 'aria-label': `progress bar ${id}` }}
          />
          {testItems.map((testItem, idx) => {
            const key = `${id}_${idx}`
            return <TestItem key={key} item={createList()} isVisible={idx === page} />
          })}
          <Button theme='Inverted' onPress={onNext}>
            <Text text='Next' />
          </Button>
        </>
      )}
    </div>
  )
}
Listening.whyDidYouRender = true
export default Listening
