import TestTopic from '../../components/TestTopic'

function Home(): JSX.Element {
  return (
    <div>
      <TestTopic titles={['hi', 'hello', 'bye']} />
    </div>
  )
}
export default Home
