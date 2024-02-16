import { useNavigate } from 'react-router-dom'
import { categories } from '../../services/ListeningService'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import { twMerge } from '../../../utils/tailwind'

interface Props {
  className?: string
}
function TestTopic(props: Props): JSX.Element | null {
  const { className } = props
  const navigate = useNavigate()
  return (
    <div className={twMerge('tw-flex tw-gap-2 tw-py-2', className)}>
      {categories?.map((category, idx) => {
        const key = `${category}_${idx}`
        return (
          <Button
            key={key}
            theme='Inverted'
            size='Medium'
            onPress={() => navigate(`/test/${category}`)}
          >
            <Text text={category} />
          </Button>
        )
      })}
    </div>
  )
}

export default TestTopic
