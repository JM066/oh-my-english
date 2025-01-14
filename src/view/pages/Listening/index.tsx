import { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import useListeningQuestion from '../../hooks/api/useListeningQuestion'
import ProgressBar from '../../components/atoms/ProgressBar'
import Text from '../../components/atoms/Text'
import Button from '../../components/atoms/Button'
import List from '../../components/molecules/List'
import { addItems, shuffle } from '../../../utils/arrayOperations'

function Listening(): JSX.Element | null {
  const { id } = useParams()
  const [page, setPage] = useState<number>(0)
  const { listeningData, isLoading } = useListeningQuestion(id)
  console.error('result', listeningData)

  useEffect(() => {
    setPage(0)
  }, [listeningData, isLoading])

  const onNext = useCallback(() => {
    if (!listeningData || listeningData.length === 0) return
    setPage((prev) => Math.min(prev + 1, listeningData.length - 1))
  }, [listeningData])

  const shuffledItems = useMemo(() => {
    if (!listeningData) return []
    return shuffle(addItems(listeningData[page].words, listeningData[page].distractors))
  }, [listeningData, page])

  if (!shuffledItems) return null
  return (
    <div className=''>
      {!isLoading && (
        <>
          <ProgressBar
            label={<Text as='h2' text={`${page + 1}/${shuffledItems.length}`} />}
            showValueLabel={false}
            value={page + 1}
            maxValue={shuffledItems.length}
            minValue={0}
            color='Success'
            labelClassName='tw-justify-end'
            options={{ 'aria-label': `progress bar ${id}` }}
          />
          <List item={shuffledItems} />
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
