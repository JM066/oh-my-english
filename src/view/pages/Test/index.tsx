import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchTests from '../../hooks/api/useFetchTests'
import LoadingCard from '../../components/atoms/LoadingCard'
import ProgressBar from '../../components/atoms/ProgressBar'
import Text from '../../components/atoms/Text'

function Test(): JSX.Element | null {
  const { id } = useParams()
  const [currentIdx, setCurrentIdx] = useState<number>(0)
  const { tests, isLoading } = useFetchTests(id)
  if (!tests) return null
  return (
    <div>
      <ProgressBar
        label={<Text as='h2' text='hihi' />}
        value={currentIdx}
        maxValue={tests?.length}
        minValue={0}
        options={{ 'aria-label': `progress bar ${id}` }}
      />
      {!isLoading ? (
        tests?.map((test, idx) => {
          const key = `${test.id}_${idx}`
          setCurrentIdx(idx)
          return <div key={key}>{test.answerKr}</div>
        })
      ) : (
        <LoadingCard />
      )}
      <div>ni</div>
    </div>
  )
}
Test.whyDidYouRender = true
export default Test
