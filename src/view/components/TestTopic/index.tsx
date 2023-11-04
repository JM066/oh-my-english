import useFetchListeningTest from '../../hooks/api/useFetchListeningTest'
import Box from '../atoms/Box'
import Text from '../atoms/Text'

interface Props {
  className?: string
}
function TestTopic(props: Props): JSX.Element | null {
  const { className } = props
  const { listeningData, isLoading } = useFetchListeningTest()
  console.log('listening', listeningData)
  if (!listeningData) return null
  if (isLoading) return <div>Loading</div>
  return (
    <div className='tw-flex tw-flex-col tw-border-1 tw-border-gray-300 tw-border-solid'>
      {listeningData?.map((data, idx) => {
        const key = `${data.title}_${idx}`
        console.log('test', data)
        return (
          <Box key={key} border={idx !== 0 ? 'Top' : 'Custom'} radius='Custom'>
            <Text text={data.title} />
          </Box>
        )
      })}
    </div>
  )
}

export default TestTopic
