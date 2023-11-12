import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchTests from '../../hooks/api/useFetchTests'
import LoadingCard from '../../components/atoms/LoadingCard'
import ProgressBar from '../../components/atoms/ProgressBar'
import Text from '../../components/atoms/Text'
import Button from '../../components/atoms/Button'

function Test(): JSX.Element | null {
  const { id } = useParams()
  const [current, setCurrent] = useState<number>(0)
  const { tests, isLoading } = useFetchTests(id)
  console.log('test', tests)
  if (!tests) return null
  return (
    <div>
      {!isLoading ? (
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
            onPress={() => setCurrent((prev) => Math.min(prev + 1, tests.length))}
          >
            <Text text='Next' />
          </Button>
        </>
      ) : (
        <LoadingCard />
      )}
    </div>
  )
}
Test.whyDidYouRender = true
export default Test
