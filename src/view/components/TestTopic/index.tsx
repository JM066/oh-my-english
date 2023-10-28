import Box from '../atoms/Box'
import Text from '../atoms/Text'

interface Props {
  titles: string[]
}
function TestTopic(props: Props): JSX.Element {
  const { titles } = props

  return (
    <div className='tw-flex tw-flex-col tw-border-1 tw-border-gray-300 tw-border-solid'>
      {titles.map((title, idx) => {
        const key = `${title}_${idx}`
        return (
          <Box key={key} border={idx !== 0 ? 'Top' : 'Custom'} radius='Custom'>
            <Text text={title} />
          </Box>
        )
      })}
    </div>
  )
}

export default TestTopic
