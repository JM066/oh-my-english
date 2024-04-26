import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetchListeningTest from '../../hooks/api/useFetchListeningTest'
import ProgressBar from '../../components/atoms/ProgressBar'
import Text from '../../components/atoms/Text'
import Button from '../../components/atoms/Button'
import TestItem from '../../components/molecules/TestItem'
import { addItems, shuffle } from '../../../utils/arrayOperations'
import { createListItem } from '../../../utils/normalize'

function Listening(): JSX.Element | null {
  const { id } = useParams()
  const [page, setPage] = useState<number>(0)
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
          <TestItem item={createListItem(shuffledItems)} />
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
