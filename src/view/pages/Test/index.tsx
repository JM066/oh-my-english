import { useParams } from 'react-router-dom'
import useFetchTests from '../../hooks/api/useFetchTests'
import LoadingCard from '../../components/atoms/LoadingCard'

function Test() {
  const { id } = useParams()

  const { listeningData, isLoading } = useFetchTests(id)

  return (
    <div>
      {!isLoading ? (
        listeningData?.map((data, idx) => {
          console.log('data', data)
          const key = `${data.id}_${idx}`
          return <div key={key}>{data.answerKr}</div>
        })
      ) : (
        <LoadingCard />
      )}
    </div>
  )
}
export default Test
